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
require("dotenv").config();
const { EMAIL, MIDDLE_EMAIL } = process.env;
const {} = require("./controllers.js");
const { transporter } = require("../config/mailer");

const router = Router();

router.get('/cars/:locationId', async (req, res, next) => {
    const { brand, category, order, orderType, startDate, endDate, page } = req.query
    //PENDIENTE: FILTRADO POR FECHA!
    //date(availableDate)
    const { locationId } = req.params
    const carsPerPage = 8

  try {
    //los tengo como un array de objetos.
    if (category && brand) {
      const categoryName = await CarType.findOne({ where: { name: category } });
      const filterByBoth = await Car.findAll({
        where: { locationId: locationId, brand: brand, carTypeId: categoryName.id },
        limit: carsPerPage,
        offset: page * carsPerPage,
        order: [[orderType, order]],
        include: [
          { model: CarType },
          { model: Location },
          { model: IncludedEquipment, attributes: ["name"], through: { attributes: [] } },
          { model: OptionalEquipment, attributes: ["name"], through: { attributes: [] } },
        ],
      });
      return res.json(filterByBoth);
    }
    if (brand) {
      const carsByBrand = await Car.findAll({
        where: { locationId: locationId, brand: brand },
        limit: carsPerPage,
        offset: page * carsPerPage,
        order: [[orderType, order]],
        include: [
          { model: CarType },
          { model: Location },
          { model: IncludedEquipment, attributes: ["name"], through: { attributes: [] } },
          { model: OptionalEquipment, attributes: ["name"], through: { attributes: [] } },
        ],
      });
      return res.json(carsByBrand);
    }
    if (category) {
      const categoryName = await CarType.findOne({ where: { name: category } });
      const carsByCategory = await Car.findAll({
        where: { locationId: locationId, carTypeId: categoryName.id },
        limit: carsPerPage,
        offset: page * carsPerPage,
        order: [[orderType, order]],
        include: [
          { model: CarType },
          { model: Location },
          { model: IncludedEquipment, attributes: ["name"], through: { attributes: [] } },
          { model: OptionalEquipment, attributes: ["name"], through: { attributes: [] } },
        ],
      });
      return res.json(carsByCategory);
    }
    if (orderType) {
      const onlyOrder = await Car.findAll({
        where: { locationId: locationId },
        limit: carsPerPage,
        offset: page * carsPerPage,
        order: [[orderType, order]],
        include: [
          { model: CarType },
          { model: Location },
          { model: IncludedEquipment, attributes: ["name"], through: { attributes: [] } },
          { model: OptionalEquipment, attributes: ["name"], through: { attributes: [] } },
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
        { model: IncludedEquipment, attributes: ["name"], through: { attributes: [] } },
        { model: OptionalEquipment, attributes: ["name"], through: { attributes: [] } },
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
          attributes: ["name"],
          through: { attributes: [] },
        },
        {
          model: OptionalEquipment,
          as: "optionalEquipments",
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });
    if (!car) return res.status(404).json({ msg: "No corresponding car" });
    res.json(car);
  } catch (error) {
    next(error);
  }
});

router.post("/send-email", async (req, res, next) => {
  const { name, email, phone, message, subject } = req.body;

  contentHTML = `
        <h1>User Information</h1>
        <ul>
            <li>Name: ${name}</li>
            <li>User Email: ${email}</li>
            <li>Phone: ${phone ? phone : "Number not added"}</li>
        </ul>
        <p>${message}</p>
    `;

  const info = await transporter.sendMail({
    from: `RC G7 Contact Us <${MIDDLE_EMAIL}>`,
    to: EMAIL,
    subject: subject ? subject : "No subject",
    html: contentHTML,
    replyTo: email,
  });
  return res.send("Message sent succesfully");
});
module.exports = router;
