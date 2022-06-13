const { Router } = require("express");
const { expressjwt: jwt } = require("express-jwt");
const jwks = require("jwks-rsa");
const jwtScope = require("express-jwt-scope");
const { statusUpdater } = require("./controllers.js");
require("dotenv").config();
const router = Router();

const {
  User,
  RentOrder,
  OptionalEquipment,
  Driver,
  Location,
  IndividualCar,
  CarModel,
  CarType,
  IncludedEquipment,
} = require("../db.js");

const { STRIPE_SECRET_KEY } = process.env;
const stripe = require("stripe")(STRIPE_SECRET_KEY);

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
const checkScopes = (permissions) => jwtScope(permissions, { scopeKey: "permissions", requireAll: true });

// router.use(authMiddleWare);
// router.use(checkScopes("read:user"));

// ===================================GET== USERS
router.get("/users", async (req, res, next) => {
  const { email } = req.query;
  // console.log(email);
  try {
    let users = await User
      .findAll
      //   {
      //   include: [
      //     { model: RentOrder, attributes: ["startingDate", "endingDate"] },
      //     {
      //       model: Driver,
      //       attributes: ["firstName", "lastName"],
      //     },
      //     { model: Payment, attributes: ["firstName", "lastName"] }, //EL MODELO DE PAYMENT YA NO EXISTE!!!
      //   ],
      // }
      ();
    if (email) {
      users = users.filter((u) => u.email.includes(email));
      if (!users) return res.status(404).json({ msg: "user not found" });
      return res.status(200).json(users);
    }
    if (!email) {
      return res.status(200).json(users);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/users/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    await user.destroy();
    const users = await User.findAll();
    return res.json(users);
  } catch (error) {
    next(error);
  }
});

//============ RENT
router.get("/rent", async (req, res, next) => {
  try {
    await statusUpdater();
    const orders = await RentOrder.findAll();
    res.status(200).send(orders);
  } catch (error) { }
});

//============ CARS
router.get("/allCars", async (req, res, next) => {
  const { plate, locationId, page = 1, order = "ASC" } = req.query;
  let cars = [];
  try {
    if (plate) {
      let specificCar = await IndividualCar.findAll({
        order: [[{ model: CarModel }, "rating", "ASC"]],
        include: [{
          model: CarModel,
          attributes: ["brand", "images", "rating"],
        },
        {
          model: Location,
          attributes: ["city"]
        }]
      });
      specificCar = specificCar.filter((sc) =>
        sc.license_plate.includes(plate.toUpperCase())
      );
      cars = specificCar;
    }

    if (!plate) {
      let allCars = await IndividualCar.findAll({
        order: [[{ model: CarModel }, "rating", "ASC"]],
        include: [{
          model: CarModel,
          attributes: ["brand", "images", "rating"],
        },
        {
          model: Location,
          attributes: ["city"]
        }]
      });
      cars = allCars;
    }
    if (order === 'desc') cars = cars.reverse();

    let totalPages = 1;
    let carsPerPage = 7;
    totalPages = Math.ceil(cars.length / carsPerPage)
    cars = cars.slice((page - 1) * carsPerPage, page * carsPerPage);

    return res.status(200).json({ cars, totalPages });
  } catch (e) {
    next(e);
  }
});

router.get("/equipment/included", async (req, res, next) => {
  try {
    const includedlEquipment = await IncludedEquipment.findAll();
    return res.status(200).send(includedlEquipment);
  } catch (error) {
    next(error);
  }
});

router.get("/equipment/optional", async (req, res, next) => {
  try {
    const optionalEquipment = await OptionalEquipment.findAll();
    return res.status(200).send(optionalEquipment);
  } catch (error) {
    next(error);
  }
});

// ============================ POST =============================================================//

//============== CARS & MODEL
router.post("/model", authMiddleWare, async (req, res, next) => {
  const {
    model,
    brand,
    pricePerDay,
    passengers,
    trunk,
    consumption,
    engine,
    images,
    carType,
    description,
    includedEquipment,
    optionalEquipment,
  } = req.body;
  try {
    const checkIfModelExist = await CarModel.findOne({
      where: { model: model },
    });
    if (checkIfModelExist) return res.status(200).send({ msg: "This model already exist" });
    //////////////////////// ESTA FUNCION SE DESCOMENTA CUANDO SE NECESITA AGREGAR PRECIO DE STRIPE

    // const product = await stripe.products.create({
    //   name: `${brand} ${model}`,
    // });
    // const price = await stripe.prices.create({
    //   product: product.id,
    //   unit_amount: pricePerDay * 100,
    //   currency: "usd",
    // });

    ////////////////////////////////
    const newModel = await CarModel.create({
      brand: brand,
      model: model,
      pricePerDay: parseFloat(pricePerDay),
      passengers: parseInt(passengers),
      trunk: trunk,
      consumption: parseFloat(consumption),
      engine: parseFloat(engine),
      images: images,
      description: description,
      //stripePriceId: price.id,
    });

    const type = await CarType.findOne({ where: { name: carType } });
    await type.addCarModel(newModel);

    await Promise.all(
      includedEquipment.map(async (element) => {
        const included = await IncludedEquipment.findOne({
          where: { name: element },
        });
        if (included) await newModel.addIncludedEquipment(included);
      })
    );

    await Promise.all(
      optionalEquipment.map(async (element) => {
        const optional = await OptionalEquipment.findOne({
          where: { name: element },
        });
        if (optional) await newModel.addOptionalEquipment(optional);
      })
    );

    return res.status(201).send({ msg: "New car model created" });
  } catch (error) {
    console.log(error.error);
    next(error);
  }
});

router.post("/car", authMiddleWare, async (req, res, next) => {
  const { model, licensePlate, year, location } = req.body;
  try {
    const findModel = await CarModel.findOne({ where: { model: model } });
    const findCar = await IndividualCar.findOne({
      where: { license_plate: licensePlate },
    });
    if (findCar)
      return res.status(200).send({ msg: "License plate already in use" });
    const car = await IndividualCar.create({
      license_plate: licensePlate.toUpperCase(),
      year: year,
    });
    const carLocation = await Location.findOne({ where: { id: location } });

    await findModel.addIndividualCar(car);
    await carLocation.addIndividualCar(car);
    await carLocation.addCarModel(findModel);

    return res.status(201).send({ msg: "New car created" });
  } catch (error) {
    next(error);
  }
});

router.delete("/cars/delete/:license_plate", async (req, res, next) => {
  const { license_plate } = req.params;
  try {
    let car = await IndividualCar.destroy({ where: { license_plate } });
    if (car === 1) {

      res.send({ msg: "Deleted", license: license_plate })
    }
    else if (car === 0)
      res.status(404).send({
        msg: "Car not found, check and try again",
        license: license_plate,
      });
  } catch (error) {
    next(error);
  }
});

//===================================================RESERVATIONS==================================

router.get("/reservations", async (req, res, next) => {
  const { userId, orderId } = req.query;

  try {
    await statusUpdater();
    if (userId) {
      let orders = await RentOrder.findAll({
        where: { userId },
        include: [{ model: IndividualCar, include: [CarModel, Location] },
        { model: User, attributes: ['firstName', 'lastName', 'email'] }
        ],
      });
      return orders.length ? res.send({ orders }) : res.status(404).send({ msg: "There are no orders for the user" });
    }
    if (orderId) {
      let order = await RentOrder.findOne({
        where: { id: orderId },
        include: [{ model: IndividualCar, include: [CarModel, Location] },
        { model: User, attributes: ['firstName', 'lastName', 'email'] }
        ],
      });
      return order !== null ? res.send({ order }) : res.status(404).send({ msg: "order not found" });
    }
    // let orders = await RentOrder.findAll({include:[{model:IndividualCar, include:[CarModel, Location]}]});
    let orders = await RentOrder.findAll({
      include: {
        model: User,
        attributes: ["firstName", "lastName", "email"],
      },
    });
    orders.length ? res.send({ orders }) : res.status(404).send({ msg: "There are no orders" });
  } catch (error) {
    next(error);
  }
});

router.delete("/reservations/delete/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    let order = await RentOrder.destroy({ where: { id } });
    if (order === 1) res.send({ msg: "Deleted", id });
    else if (order === 0) res.status(404).send({ msg: "Order not found, check and try again", id });
  } catch (error) {
    next(error);
  }
});

router.get("/reservation/:orderId", async (req, res, next) => {
  const { orderId } = req.params;
  try {
    await statusUpdater()
    if (orderId) {
      let order = await RentOrder.findOne({
        where: { id: orderId },
        include: [
          { model: IndividualCar, include: [CarModel, Location] },
          { model: User, attributes: ["firstName", "lastName", "email", "license"] },
          Driver, Location
        ],
      });
      return order !== null ? res.send({ order }) : res.status(404).send({ msg: "order not found" });
    }
  } catch (error) {
    console.log(error)
  }
});

module.exports = router;
