const { Router } = require("express");
const {
  Op,
  User,
  RentOrder,
  IndividualCar,
  CarModel,
  Location,
  Driver,
  OptionalEquipment,
} = require("../db.js");
const { statusUpdater } = require("./controllers.js");
const { expressjwt: jwt } = require("express-jwt");
const jwks = require("jwks-rsa");
require("dotenv").config();

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

// ============================ GET =============================================================//
router.get("/", authMiddleWare, async (req, res, next) => {

  const { email } = req.query;
  try {
    let completed;
    const user = await User.findOne({ where: { email } });
    if (user === null) return res.send({ msg: "User not found" });
    user.firstName && user.lastName && user.documentId && user.license
      ? (completed = true)
      : (completed = false);

    await statusUpdater();
    const allowedStatus = ["maintenance", "concluded"];
    let userReservations = await User.findByPk(user.id, {
      include: [{
        model: RentOrder,
        where: {
          rated: false,
          status: { [Op.or]: allowedStatus }
        },
        attributes: { exclude: ['refunds', "paymentDays", "paymentAmount"] },
        include: [{
          model: IndividualCar,
          include: [{
            model: CarModel,
            attributes: ['brand', "model", "images"],
          }]
        }]
      }]
    })
    let reservations = [];
    if (userReservations) {
      userReservations.rentOrders.forEach(e => {
        if (!reservations.find(el => el.model === e.individualCar.carModel.model)) {
          reservations.push({
            model: e.individualCar.carModel.model,
            brand: e.individualCar.carModel.brand,
            img: e.individualCar.carModel.images[0],
          })
        }
      });
    }

    return res.status(200).send({ data: user, completed, reservations });
  } catch (error) {
    next(error);
  }
});

router.get("/reservations", async (req, res, next) => {
  const { userId } = req.query;

  try {
    if (userId) {
      await statusUpdater();
      let orders = await RentOrder.findAll({
        where: { userId, payed: true },
        attributes: { exclude: ["refunds", "paymentDays", "paymentAmount"] },
        include: [{ model: IndividualCar, include: [CarModel, Location] }],
      });
      return res.json(orders);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/reservation/:orderId", async (req, res, next) => {
  const { orderId } = req.params;
  try {
    await statusUpdater();
    if (orderId) {
      let order = await RentOrder.findOne({
        where: { id: orderId, payed: true },
        include: [{ model: IndividualCar, include: [CarModel, Location] },
        { model: User, attributes: ['firstName', 'lastName', 'email'] },
          Location,
          Driver,
          OptionalEquipment,
        ],
      });
      return order !== null
        ? res.send({ order })
        : res.status(404).send({ msg: "order not found" });
    }
  } catch (error) {
    next(error)
  }
});

router.get("/otherRents/:rentId", async (req, res, next) => {
  const { rentId } = req.params;
  try {
    await statusUpdater();
    const rent = await RentOrder.findByPk(rentId)
    const allowedStatus = ["pending", "in use", "maintenance"];
    const otherRentsSameCar = await IndividualCar.findByPk(rent.individualCarId,
      {
        include:
          [{
            model: RentOrder,
            where: { id: { [Op.ne]: rentId }, status: { [Op.or]: allowedStatus } }
          }]
      }
    )
    if (!otherRentsSameCar) return res.json([]);
    return res.json(otherRentsSameCar.rentOrders.map(r => ({ startingDate: r.startingDate, endingDate: r.endingDate })));
  } catch (error) {
    next(error)
  }
});

// ============================ POST =============================================================//
router.post("/", async (req, res, next) => {
  const { email, picture } = req.body;
  try {
    const [user, created] = await User.findOrCreate({
      where: {
        email: email,
      },
      defaults: {
        picture: picture,
      },
    });
    let completed;
    user.firstName && user.lastName && user.documentId && user.license
      ? (completed = true)
      : (completed = false);
    if (created)
      return res
        .status(201)
        .json({ msg: "User created", data: user.id, completed });
    return res.status(200).json({
      msg: "User found",
      data: user.id,
      completed,
    });
  } catch (error) {
    next(error);
  }
});

// ============================ PATCH =============================================================//
//[ 'Trafic', 'Corolla' ]
router.patch("/rate", authMiddleWare, async (req, res, next) => {

  const { userId, ratings } = req.body;  //ratings = {model:name, rate:number}
  try {
    const allowedStatus = ["maintenance", "concluded"];
    let userReservations = await User.findByPk(userId, {
      include: [{
        model: RentOrder,
        where: {
          rated: false,
          status: { [Op.or]: allowedStatus }
        },
        attributes: { exclude: ['refunds', "paymentDays", "paymentAmount"] },
        include: [{
          model: IndividualCar,
          where: { carModelModel: String(ratings.model) },
          include: [{
            model: CarModel,
          }]
        }]
      }]
    })
    if (!userReservations) return res.status(404).json({ msg: "RentOrder not found!!!" });
    await Promise.all(
      userReservations.rentOrders.map((d) => RentOrder.update({ rated: true }, { where: { id: d.id } }))
    )
    if (ratings.rate) {
      const model = userReservations.rentOrders[0].individualCar.carModel;
      const ratingNum = model.ratingNum + 1;
      const rating = (model.rating * model.ratingNum + ratings.rate) / ratingNum;
      await CarModel.update({ rating, ratingNum }, { where: { model: model.model } });
    }
    res.json({ msg: 'OK' })
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", authMiddleWare, async (req, res, next) => {
  try {
    const { id } = req.params;
    const v4 = new RegExp(
      /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    );
    const { firstName, lastName, documentId, license, phone, language } =
      req.body;

    if (!v4.test(id)) return res.status(406).send({ msg: "Invalid id format" });
    const user = await User.findOne({ where: { id } });
    if (user === null) return res.status(404).send({ msg: "User not found" });
    User.update(
      { firstName, lastName, documentId, license, phone },
      { where: { id } }
    );
    return res.status(202).send({
      msg: "user updated",
      updatedData: {
        firstName,
        lastName,
        documentId,
        license,
        phone,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
