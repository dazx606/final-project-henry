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

// ============================ POST =============================================================//
router.post("/model", async (req, res, next) => {
  // RUTA PARA AGREGAR NUEVO MODELO A LA BASE DE DATOS
  const {
    model,
    brand,
    pricePerDay,
    stripePriceId,
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
    //CHECAR SI EL MODELO YA EXISTE EN LA BASE DE DATOS
    const checkIfModelExist = await CarModel.findOne({
      where: { model: model },
    });
    if (checkIfModelExist)
      return res.status(409).send({ msg: "This model already exist" });
    //AQUI SE CREA EL NUEVO MODELO
    const newModel = await CarModel.create({
      brand: brand,
      model: model,
      pricePerDay: pricePerDay,
      passengers: passengers,
      trunk: trunk,
      consumption: consumption,
      engine: engine,
      images: images,
    });
    //SE RELACIONA EL MODELO A LAS SEDES QUE RECIBEN POR BODY
    await Promise.all(
      location.map(async (element) => {
        const carLocation = await Location.findOne({
          where: { city: element },
        });
        if (carLocation) await carLocation.addCarModel(newModel);
      })
    );
    //SE RELACIONA EL TIPO DE CARRO QUE SE RECIBE POR BODY CON EL MODELO CREADO
    const type = await CarType.findOne({ where: { name: carType } });
    await type.addCarModel(newModel);
    //SE RELACIONAN LOS ACCESORIOS INCLUIDOS RECIBIDOS POR BODY CON EL MODELO CREADO
    await Promise.all(
      includedEquipment.map(async (element) => {
        const included = await IncludedEquipment.findOne({
          where: { name: element },
        });
        if (included) await newModel.addIncludedEquipment(included);
      })
    );
    //SE RELACIONAN LOS ACCESORIOS OPCIONALES RECIBIDOS POR BODY CON EL MODELO CREADO
    await Promise.all(
      optionalEquipment.map(async (element) => {
        const optional = await OptionalEquipment.findOne({
          where: { name: element },
        });
        if (optional) await newModel.addOptionalEquipment(optional);
      })
    );
    //RESPUESTA CREACION EXITOSA
    return res.status(201).send({ msg: "New car model created" });
  } catch (error) {
    next(error);
  }
});

router.post("/car", async (req, res, next) => {
  const { model, licensePlate, year, location } = req.body;
  try {
    //ENCONTRAR MODELO SELECCIONADO
    const findModel = await CarModel.findOne({ where: { model: model } });
    //VER SI EL LICENSE PLATE NO EXISTE EN LA BASE DE DATOS
    const [car, created] = await IndividualCar.findOrCreate({
      where: { license_plate: licensePlate },
      defaults: { license_plate: licensePlate, year: year },
    });
    if (!created)
      return res.send(409).send({ msg: "License plate already in use" });
    //SE RELACIONA EL MODELO CON EL AUTO CREADO
    await findModel.addIndividualCar(car);
    //SE BUSCA LA CIUDAD SELECCIONADA Y SE RELACIONA CON EL AUTO
    const carLocation = await Location.findOne({ where: { city: location } });
    await carLocation.addIndividualCar(car);
    return res.status(201).send({ msg: "New car created" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
