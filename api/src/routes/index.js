const { Router } = require("express");
const { Op, CarModel, CarType, Driver, IncludedEquipment, IndividualCar, Location, OptionalEquipment, Payment, RentOrder, User } = require("../db.js");
require("dotenv").config();
const { EMAIL, MIDDLE_EMAIL } = process.env;
const { } = require("./controllers.js");
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
      const filterByBoth = await Location.findByPk(
        locationId,
        {
          include: [
            {
              model: CarModel,
              where: { brand: brand, carTypeId: categoryName.id },
              limit: carsPerPage,
              offset: page * carsPerPage,
              order: [[orderType, order]],
              through: { attributes: [] },
              include: [
                { model: CarType },
                { model: IncludedEquipment, attributes: ["name"], through: { attributes: [] } },
                { model: OptionalEquipment, attributes: ["name"], through: { attributes: [] } },
              ]
            },
          ]
        }
      )



      // const categoryName = await CarType.findOne({ where: { name: category } });
      // const filterByBoth = await CarModel.findAll({
      //   where: { locationId: locationId, brand: brand, carTypeId: categoryName.id },
      //   limit: carsPerPage,
      //   offset: page * carsPerPage,
      //   order: [[orderType, order]],
      //   include: [
      //     { model: CarType },
      //     { model: Location },
      //     { model: IncludedEquipment, attributes: ["name"], through: { attributes: [] } },
      //     { model: OptionalEquipment, attributes: ["name"], through: { attributes: [] } },
      //   ],
      // });
      return res.json(filterByBoth);
    }
    if (brand) {
      const carsByBrand = await CarModel.findAll({
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
      const carsByCategory = await CarModel.findAll({
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
      const onlyOrder = await CarModel.findAll({
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
    const locationCarModels = await Location.findByPk(
      locationId,
      {
        include: [
          {
            model: CarModel, through: { attributes: [] }, include: [
              { model: CarType },
            ]
          },
        ]
      }
    )
    let brands = locationCarModels.carModels.map((car) => car.brand);
    brands = [...new Set(brands)];
    let categories = locationCarModels.carModels.map((car) => car.carType.name);
    categories = [...new Set(categories)];
    return res.json({ brands, categories });
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

router.get("/car/:modelId", async (req, res, next) => {
  try {
    const { modelId } = req.params;
    const car = await CarModel.findByPk(modelId, {
      include: [
        {
          model: CarType,
          as: "carType",
          attributes: ["name"],
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
