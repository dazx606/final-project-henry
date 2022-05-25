const { Op } = require("../db.js");
const { Router } = require("express");
const { Car, Location } = require("../db.js");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/locations", async (req, res) => {
  const locations = await Location.findAll({
    attributes: ["city", "id", "latitude", "longitude"],
  });
  res.json(locations);
});

router.get("/locationCars", async (req, res) => {
  const { locationId } = req.query;
  const cars = await Car.findAll({
    where: {
      location: locationId,
    },
  });
  res.json(cars);
});

router.get("/cars/:carsId", async (req, res) => {
  try {
    const { carsId } = req.params;
    const car = await Car.findOne({
      where: {
        id: carsId,
      },
    });
    res.json(car);
  } catch (error) {
    res.status(404).json({ message: "the car doesn't exist" });
  }
});

module.exports = router;
