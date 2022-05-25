const { Op } = require('../db.js');
const { Router } = require("express");
const { Op, Car, Location } = require("../db.js");

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

router.get("/locationCars/:locationId", async (req, res) => {
  const { locationId } = req.params;
  const cars = await Car.findAll({
    where: {
      locationId,
    },
  });
  res.json(cars);
});

module.exports = router;
