const { Router } = require("express");
const {
  User,
  RentOrder,
  OptionalEquipment,
  Driver,
  Location,
  IndividualCar,
  CarModel,
  CarType,
  Payment,
  IncludedEquipment,
} = require("../db.js");
const { expressjwt: jwt } = require("express-jwt");
const jwks = require("jwks-rsa");
require("dotenv").config();

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

const router = Router();

// ============================ GET =============================================================//
router.get("/", (req, res, next) => {
  try {
    res.send("si");
  } catch (error) {}
});
// ============ USERS
router.get("/users", async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [
        { model: RentOrder, attributes: ["startingDate", "endingDate"] },
        {
          model: Driver,
          attributes: ["firstName", "lastName"],
        },
        { model: Payment, attributes: ["firstName", "lastName"] },
      ],
    });
    return res.json(users);
  } catch (error) {
    console.log(error);
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
    return res.json({ message: "User deleted" });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//============ RENT
router.get("/rent", async (req, res, next) => {
  try {
    const orders = await RentOrder.findAll();
    res.status(200).send(orders);
  } catch (error) {}
});

//============ CARS
router.get("/allCars", async (req, res, next) => {
  const { plate, locationId } = req.query;
  console.log(plate);
  try {
    if (plate && !locationId) {
      let specificCar = await IndividualCar.findAll({
        where: {
          license_plate: plate.toString(),
        },
        order: [["license_plate", "ASC"]],
        include: {
          model: CarModel,
          attributes: ["model"],
        },
      });
      if (!specificCar.length)
        return res.status(404).json({ msg: "car not found" });
      return res.status(200).json({ car: specificCar });
    }

    if (locationId) {
      let carsInCity = await Location.findByPk(locationId, {
        order: [[{ model: IndividualCar }, "license_plate", "ASC"]],
        include: [
          {
            model: IndividualCar,
          },
          {
            model: CarModel,
            attributes: ["model"],
          },
        ],
      });
      carsInCity = carsInCity.individualCars;
      if (plate) {
        carsInCity = carsInCity.filter((c) =>
          c.license_plate.includes(plate.toString())
        );
      }

      return res.status(200).json({ cars: carsInCity });
    }

    if (!plate && !locationId) {
      let allCars = await IndividualCar.findAll({
        order: [["license_plate", "ASC"]],
        include: {
          model: CarModel,
          attributes: ["model"],
        },
      });
      return res.status(201).json({ car: allCars });
    }
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
router.post("/model", async (req, res, next) => {
  const {
    model,
    brand,
    pricePerDay,
    passengers,
    trunk,
    consumption,
    engine,
    images,
    location,
    carType,
    includedEquipment,
    optionalEquipment,
  } = req.body;
  try {
    const checkIfModelExist = await CarModel.findOne({
      where: { model: model },
    });
    if (checkIfModelExist)
      return res.status(409).send({ msg: "This model already exist" });
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
      //stripePriceId: price.id,
    });

    await Promise.all(
      location.map(async (element) => {
        const carLocation = await Location.findOne({
          where: { city: element },
        });
        if (carLocation) await carLocation.addCarModel(newModel);
      })
    );

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
    next(error);
  }
});

router.post("/car", async (req, res, next) => {
  const { model, licensePlate, year, location } = req.body;
  try {
    const findModel = await CarModel.findOne({ where: { model: model } });

    const [car, created] = await IndividualCar.findOrCreate({
      where: { license_plate: licensePlate },
      defaults: { license_plate: licensePlate, year: year },
    });
    if (!created)
      return res.send(409).send({ msg: "License plate already in use" });

    await findModel.addIndividualCar(car);
    const carLocation = await Location.findOne({ where: { city: location } });
    await carLocation.addIndividualCar(car);

    return res.status(201).send({ msg: "New car created" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
