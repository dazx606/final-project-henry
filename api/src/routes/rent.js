const { Router } = require("express");
const { Op, CarModel, CarType, Driver, IncludedEquipment, IndividualCar, Location, OptionalEquipment, RentOrder, User } = require("../db.js");
require("dotenv").config();
const { STRIPE_SECRET_KEY } = process.env;
const { datePlus, filterRentDates, getDatesInRange } = require("./controllers.js");

const router = Router();
const stripe = require("stripe")(STRIPE_SECRET_KEY);
const YOUR_DOMAIN = "http://localhost:3000";  //DIRECCION DEL FRONT

router.post("/car", async (req, res, next) => {
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
      client_reference_id: rentId,
      mode: 'payment',
      expires_at: 3600 + Math.floor(new Date().getTime() / 1000),
      success_url: `${YOUR_DOMAIN}/booking?success=true`,
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
    return res.json({ url: session.url })
  } catch (error) {
    next(error);
  }
});



module.exports = router;