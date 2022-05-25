const { Router } = require("express");
const {
  Op,
  Car,
  CarType,
  Driver,
  IncludedEquipment,
  Location,
  OptionalEquipment,
  Payment,
  RentOrder,
  User,
} = require("../db.js");
const {} = require("./controllers.js");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/locations", async (req, res, next) => {
  try {
    const locations = await Location.findAll();
    return res.json(locations);
  } catch (error) {
    next(error);
  }

router.get("/locationCars/:locationId", async (req, res, next) => {
  try {
    const { locationId } = req.params;
    const cars = await Car.findAll({
      where: {
        locationId: locationId,
      },
    });
    return res.json(cars);
  } catch (error) {
    next(error);
  }

router.get("/car/:carsId", async (req, res, next) => {
  try {
    const { carsId } = req.params;
    const car = await Car.findByPk(carsId, {
      include: [
        {
          model: CarType,
          as: "carType",
          attributes: ["name"],
        },
        {
          model: Location,
          as: "location",
        },
        {
          model: IncludedEquipment,
          as: "includedEquipments",
        },
        {
          model: OptionalEquipment,
          as: "optionalEquipments",
        },
      ],
    });

    if (!car) return res.status(404).json({ msg: "No corresponding car" });
    res.json(car);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
