const { Router } = require("express");
const { Op, CarModel, CarType, Driver, IncludedEquipment, IndividualCar, Location, OptionalEquipment, RentOrder, User } = require("../db.js");
require("dotenv").config();
const { STRIPE_SECRET_KEY } = process.env;
const { datePlus, filterRentDates, getDatesInRange, statusUpdater } = require("./controllers.js");

const { expressjwt: jwt } = require("express-jwt");
const jwks = require("jwks-rsa");

// ===================================== AUTHORIZATION MIDDLEWARE ==================================//
const authMiddleWare = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.AUTH_JWKS_URI,
  }),
  audience: process.env.AUTH_AUDIENCE,
  issuer: process.env.AUTH_ISSUER,
  algorithms: ["RS256"],
});

const router = Router();
const stripe = require("stripe")(STRIPE_SECRET_KEY);
const YOUR_DOMAIN = "http://localhost:3000";  //DIRECCION DEL FRONT

router.post("/car", authMiddleWare, async (req, res, next) => {
  const { location, model, startingDate, endingDate, optionalEquipments = [], drivers, endLocation, userId } = req.body;
  try {
    if (!location || !model || !startingDate || !endingDate || !drivers.length || !endLocation || !userId) return res.status(417).json({ msg: "Missing info!" });
    if (new Date(startingDate) > new Date(endingDate)) return res.status(409).json({ msg: "StartingDate cannot be greater than endingDate!" });
    const endingDateWithExtra2Days = datePlus(new Date(endingDate), 2)
    let locationCarModels = await Location.findByPk(location,
      {
        include: [
          {
            model: CarModel, where: { model }, through: { attributes: [] }, include: [
              { model: IndividualCar, where: { locationId: location }, attributes: ['id'], include: [{ model: RentOrder, attributes: ['startingDate', 'endingDate'] }] }
            ]
          },
        ]
      }
    )

    locationCarModels = locationCarModels.toJSON();

    const availableCars = filterRentDates(locationCarModels, startingDate, endingDateWithExtra2Days);

    if (!availableCars.carModels[0].individualCars.length) return res.status(404).json({ msg: "No corresponding car found!" });
    let car = availableCars.carModels[0].individualCars[0];
    availableCars.carModels[0].individualCars.forEach(c => c.rentOrders.length < car.rentOrders.length ? car = c : null);

    let newDrivers = [];
    await Promise.all(drivers.map(d => Driver.findOrCreate({ where: { firstName: d.firstName, lastName: d.lastName, licenseNumber: d.licenseNumber, documentId: d.documentId, userId } }))).then(d => newDrivers = d)

    const newRentOrder = await RentOrder.create({ startingDate, endingDate: endingDateWithExtra2Days.toDateString(), individualCarId: car.id, userId, locationId: endLocation })

    await newRentOrder.addDrivers(newDrivers.map(d => d[0].toJSON().id));
    await Promise.all(optionalEquipments.map((e) => OptionalEquipment.findOne({ where: { name: e } })))
      .then(equip => newRentOrder.addOptionalEquipments(equip))

    const rentId = newRentOrder.toJSON().id

    //======================================STRIPE======================================\\
    let carRent = await RentOrder.findByPk(rentId,
      {
        include: [
          { model: User },
          { model: OptionalEquipment, attributes: ['stripePriceId'], through: { attributes: [] } },
          { model: IndividualCar, include: [{ model: CarModel }] },
        ]
      }
    )
    carRent = carRent.toJSON();
    const numberOfDays = getDatesInRange(new Date(carRent.startingDate), datePlus(new Date(carRent.endingDate), -2)).length - 1;
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: carRent.individualCar.carModel.stripePriceId,
          quantity: numberOfDays,
        },
        ...carRent.optionalEquipments.map((equip) => ({
          price: equip.stripePriceId,
          quantity: numberOfDays,
        })),
      ],
      customer_email: carRent.user.email,
      client_reference_id: `${rentId}:${numberOfDays}`,
      mode: 'payment',
      expires_at: 3600 + Math.floor(new Date().getTime() / 1000),
      success_url: `${YOUR_DOMAIN}/reservation/${rentId}`,
      cancel_url: `${YOUR_DOMAIN}/booking?canceled=true`,
    });
    setTimeout(async () => {
      try {
        let carRent = await RentOrder.findByPk(rentId);
        if (carRent.toJSON().payed) return;
        await RentOrder.destroy({ where: { id: rentId } });
      } catch (error) {
        console.log(`Could not delete rentOrder ${rentId}`);
      }
    }, "3720000")
    return res.json({ url: session.url });
  } catch (error) {
    next(error);
  }
});

router.delete("/refund/:userId/:rentId", async (req, res, next) => {
  try {
    await statusUpdater();
    const { userId, rentId } = req.params;
    const user = await User.findByPk(userId, { include: [{ model: RentOrder, where: { id: rentId } }] });
    if (!user) return res.status(404).json({ msg: "RentOrder not found!!!" });
    const rent = user.dataValues.rentOrders[0].toJSON();
    if (["canceled", "maintenance", "concluded", "in use"].includes(rent.status)) return res.status(400).json({ msg: "RentOrder not refundable" });

    let discount = 1;
    const amountDayBeforeStart = getDatesInRange(new Date(), new Date(rent.startingDate)).length - 1;
    if (amountDayBeforeStart > 7) discount = 0.95;
    else if (amountDayBeforeStart > 2) discount = 0.90;
    else discount = 0.80;

    await Promise.all(
      rent.refunds.map(async (id, k) => {
        const refund = await stripe.refunds.create({
          payment_intent: id,
          amount: rent.paymentAmount[k] * discount,
        });
        return refund.status;
      })
    ).then(async res => {
      if (res.every(s => s === "succeeded")) {
        await RentOrder.update({ status: "canceled" }, { where: { id: rentId } });
      }
    })
    return res.json("all Ok");
  } catch (error) {
    next(error);
  }
});

router.patch("/modify", async (req, res, next) => {
  // router.patch("/modify", authMiddleWare, async (req, res, next) => {
  const { startingDate, endingDate, userId, rentId } = req.body;
  try {
    await statusUpdater();
    if (!startingDate || !endingDate || !userId || !rentId) return res.status(404).json({ msg: "Missing info!!!" });
    const user = await User.findByPk(userId,
      {
        include: [{
          model: RentOrder, where: { id: rentId }, include: [
            { model: OptionalEquipment, attributes: ['stripePriceId'], through: { attributes: [] } },
            { model: IndividualCar, include: [{ model: CarModel }] },
          ]
        }]
      });
    if (!user) return res.status(404).json({ msg: "RentOrder not found!!!" });
    const email = user.email;
    const rent = user.dataValues.rentOrders[0].toJSON();
    if (!["in use", "pending"].includes(rent.status)) return res.status(400).json({ msg: "RentOrder not modifiable" });

    const oldStart = new Date(rent.startingDate);
    const oldEnd = new Date(rent.endingDate);
    const end = new Date(endingDate);
    const maintenanceEnd = datePlus(end, 2);
    const start = new Date(startingDate);

    const otherRentsSameCar = await IndividualCar.findByPk(rent.individualCarId, { include: [{ model: RentOrder, where: { id: { [Op.ne]: rentId } }, }] })
    const unavailableDays = otherRentsSameCar.rentOrders.map(r => getDatesInRange(new Date(r.startingDate), new Date(r.endingDate))).flat()
    const startString = start.toDateString();
    const endString = maintenanceEnd.toDateString();
    for (let i = 0; i < unavailableDays.length; i++) {
      const day = unavailableDays[i].toDateString();
      if (day === startString || day === endString) return res.status(409).json({ msg: "Dates not available!!!" });
    }

    let startDiff = 0;
    let endDiff = 0;
    if (start < oldStart) {
      startDiff = getDatesInRange(start, oldStart).length - 1;
    } else if (start > oldStart) {
      startDiff -= getDatesInRange(oldStart, start).length - 1;
    }
    if (maintenanceEnd < oldEnd) {
      endDiff -= getDatesInRange(maintenanceEnd, oldEnd).length - 1;
    } else if (maintenanceEnd > oldEnd) {
      endDiff = getDatesInRange(oldEnd, maintenanceEnd).length - 1;
    }

    if (rent.status === "in use") {
      if (endDiff <= 0) return res.status(409).json({ msg: "Cannot remove days when already in use!!!" });
      if (startDiff !== 0) return res.status(409).json({ msg: "Cannot modify starting day when already in use!!!" });
    }

    let totalDiff = startDiff + endDiff;

    if (totalDiff > 0) {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: rent.individualCar.carModel.stripePriceId,
            quantity: totalDiff,
          },
          ...rent.optionalEquipments.map((equip) => ({
            price: equip.stripePriceId,
            quantity: totalDiff,
          })),
        ],
        customer_email: email,
        client_reference_id: `${rentId}:${totalDiff}:${start.toDateString()}:${maintenanceEnd.toDateString()}`,
        mode: 'payment',
        expires_at: 3600 + Math.floor(new Date().getTime() / 1000),
        success_url: `${YOUR_DOMAIN}/booking?success=true`,  ////////////////////////Cambiar esto
        cancel_url: `${YOUR_DOMAIN}/booking?canceled=true`,
      });
      return res.json({ url: session.url })
    }

    if (totalDiff === 0) {
      await RentOrder.update({ startingDate: start.toDateString(), endingDate: end.toDateString() }, { where: { id: rentId } });
      return res.json({ msg: "modified" });
    }

    if (totalDiff < 0) {
      let i = 0;
      while (totalDiff !== 0) {
        if (rent.paymentDays[i] >= - totalDiff) {
          const refundPerOrder = Math.ceil(rent.paymentAmount[i] * (-totalDiff / rent.paymentDays[i]));

          const refund = await stripe.refunds.create({
            payment_intent: rent.refunds[i],
            amount: refundPerOrder,
          });
          if (refund.status === "succeeded") {
            if (rent.paymentDays[i] === - totalDiff) {
              rent.paymentAmount.splice(i, 1);
              rent.paymentDays.splice(i, 1);
              rent.refunds.splice(i, 1);
              await RentOrder.update({
                paymentAmount: rent.paymentAmount,
                paymentDays: rent.paymentDays,
                refunds: rent.refunds,
                startingDate: start.toDateString(),
                endingDate: maintenanceEnd.toDateString(),
              },
                { where: { id: rentId } }
              );
            } else {
              rent.paymentAmount.splice(i, 1, (rent.paymentAmount[i] - refundPerOrder));
              rent.paymentDays.splice(i, 1, (rent.paymentDays[i] + totalDiff));
              await RentOrder.update({
                paymentAmount: rent.paymentAmount,
                paymentDays: rent.paymentDays,
                startingDate: start.toDateString(),
                endingDate: maintenanceEnd.toDateString(),
              },
                { where: { id: rentId } }
              );
            }
          } else return res.status(409).json({ msg: "Problems while refund!!!" });
          totalDiff = 0;
        } else {
          const refund = await stripe.refunds.create({
            payment_intent: rent.refunds[i],
          });
          if (refund.status === "succeeded") {
            totalDiff += rent.paymentDays[i];
            rent.paymentAmount.splice(i, 1);
            rent.paymentDays.splice(i, 1);
            rent.refunds.splice(i, 1);
            await RentOrder.update({
              paymentAmount: rent.paymentAmount,
              paymentDays: rent.paymentDays,
              refunds: rent.refunds,
              startingDate: start.toDateString(),
              endingDate: maintenanceEnd.toDateString(),
            },
              { where: { id: rentId } }
            );
          } else return res.status(409).json({ msg: "Problems while refund!!!" });
          i--;
        }
        i++;
      }
      return res.json("refund successful");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;