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

router.get("/cars/:locationId", async (req, res, next) => {
  const { brand, category, order, orderType, date, page } = req.query;
  //PENDIENTE: FILTRADO POR FECHA!
  //date(availableDate)
  const { locationId } = req.params;

  try {
    //los tengo como un array de objetos.
    if (category && brand) {
      const categoryName = await CarType.findOne({ where: { name: category } });
      const filterByBoth = await Car.findAll({
        where: {
          locationId: locationId,
          brand: brand,
          carTypeId: categoryName.id,
        },
        limit: 6,
        offset: page * 6,
        order: [[orderType, order]],
        include: [
          { model: CarType },
          { model: Location },
          { model: IncludedEquipment },
          { model: OptionalEquipment },
        ],
      });
      return res.json(filterByBoth);
    }
    if (brand) {
      const carsByBrand = await Car.findAll({
        where: { locationId: locationId, brand: brand },
        limit: 6,
        offset: page * 6,
        order: [[orderType, order]],
        include: [
          { model: CarType },
          { model: Location },
          { model: IncludedEquipment },
          { model: OptionalEquipment },
        ],
      });
      return res.json(carsByBrand);
    }
    if (category) {
      const categoryName = await CarType.findOne({ where: { name: category } });
      const carsByCategory = await Car.findAll({
        where: { locationId: locationId, carTypeId: categoryName.id },
        limit: 6,
        offset: page * 6,
        order: [[orderType, order]],
        include: [
          { model: CarType },
          { model: Location },
          { model: IncludedEquipment },
          { model: OptionalEquipment },
        ],
      });
      return res.json(carsByCategory);
    }
    if (orderType) {
      const onlyOrder = await Car.findAll({
        where: { locationId: locationId },
        limit: 6,
        offset: page * 6,
        order: [[orderType, order]],
        include: [
          { model: CarType },
          { model: Location },
          { model: IncludedEquipment },
          { model: OptionalEquipment },
        ],
      });
      return res.json(onlyOrder);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/locationCars/:locationId", async (req, res, next) => {
  const { locationId } = req.params;
  try {
    const allCars = await Car.findAll({
      where: { locationId: locationId },
      include: [
        { model: CarType },
        { model: Location },
        { model: IncludedEquipment },
        { model: OptionalEquipment },
      ],
    });
    return res.json(allCars);
  } catch (error) {
    next(error);
  }
});

router.get("/locations", async (req, res, next) => {
  try {
    const locations = await Location.findAll();
    return res.json(locations);
  } catch (error) {
    next(error);
  }
});

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
