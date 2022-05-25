const { Router } = require("express");
const { Op, Car, CarType, Driver, IncludedEquipment, Location, OptionalEquipment, Payment, RentOrder, User } = require("../db.js");
const {  } = require('./controllers.js')

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

});
//-------------------------Redundante esto lo esta haciendo Renato------------------------------
// router.get("/locationCars/:locationId", async (req, res, next) => {
//     try {
//         const { locationId } = req.params;
//         const cars = await Car.findAll({
//             where: {
//                 locationId: locationId,
//             },
//         });
//         return res.json(cars);
//     } catch (error) {
//         next(error);
//     }
// });

router.get("/cars/:carsId", async (req, res, next) => {
  try {
    const { carsId } = req.params;
    const car = await Car.findByPk(carsId);
    res.json(car);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
