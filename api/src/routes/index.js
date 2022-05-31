const { Router } = require("express");
const {
  Op,
  CarModel,
  CarType,
  Driver,
  IncludedEquipment,
  IndividualCar,
  Location,
  OptionalEquipment,
  Payment,
  RentOrder,
  User,
} = require("../db.js");
require("dotenv").config();
const { EMAIL, MIDDLE_EMAIL } = process.env;
const { filterDates } = require("./controllers.js");
const { transporter } = require("../config/mailer");

//================================ MIDDLEWARE PROTECTED ROUTES
const { expressjwt: jwt } = require("express-jwt");
const jwks = require("jwks-rsa");

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-t4jhp3fe.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "http://localhost:3001",
  issuer: "https://dev-t4jhp3fe.us.auth0.com/",
  algorithms: ["RS256"],
});
//================================ /MIDDLEWARE PROTECTED ROUTES

const router = Router();

router.get("/cars/:locationId", async (req, res, next) => {
  const {
    brand,
    category,
    order = "ASC",
    orderType = "pricePerDay",
    startingDate,
    endingDate,
    page = 1,
  } = req.query;
  const { locationId } = req.params;
  const carsPerPage = 8;
  const brandFilter = brand ? { where: { brand: brand } } : { where: null };
  const categoryFilter = category
    ? { where: { name: category } }
    : { where: null };
  try {
    if (!startingDate && endingDate)
      return res.status(417).json({ msg: "Missing startingDate!" });
    if (new Date(startingDate) > new Date(endingDate))
      return res
        .status(409)
        .json({ msg: "StartingDate cannot be greater than endingDate!" });
    const locationCarModels = await Location.findByPk(locationId, {
      order: [[{ model: CarModel }, orderType, order]],
      include: [
        {
          model: CarModel,
          ...brandFilter,
          through: { attributes: [] },
          include: [
            {
              model: CarType,
              ...categoryFilter,
              attributes: { exclude: ["id"] },
            },
            {
              model: IncludedEquipment,
              attributes: ["name"],
              through: { attributes: [] },
            },
            {
              model: OptionalEquipment,
              attributes: ["name"],
              through: { attributes: [] },
            },
            {
              model: IndividualCar,
              where: { locationId },
              attributes: ["id"],
              include: [
                {
                  model: RentOrder,
                  attributes: ["startingDate", "endingDate"],
                },
              ],
            },
          ],
        },
      ],
    });

    if (!locationCarModels?.carModels.length)
      return res.status(404).json({ msg: "No corresponding car found!" });

    let filterdCars = locationCarModels.carModels.map((c) => {
      const existingRents = [];
      c.individualCars.forEach((r) => {
        if (r.rentOrders.length) existingRents.push(r.rentOrders);
      });
      return {
        ...c.dataValues,
        carType: c.carType.dataValues.name,
        includedEquipments: c.includedEquipments.map((e) => e.dataValues.name),
        optionalEquipments: c.optionalEquipments.map((e) => e.dataValues.name),
        individualCars: c.individualCars.length,
        existingRents,
      };
    });

    if (startingDate)
      filterdCars = filterDates(filterdCars, startingDate, endingDate);

    if (!filterdCars.length)
      return res.status(404).json({ msg: "No corresponding car found!" });

    filterdCars = filterdCars.slice(
      (page - 1) * carsPerPage,
      page * carsPerPage
    );

    return res.json(filterdCars);
  } catch (error) {
    next(error);
  }
});
//---------------------------------------------------------------------------------------------------------------
router.get("/locationCars/:locationId", async (req, res, next) => {
  const { locationId } = req.params;
  try {
    const locationCarModels = await Location.findByPk(locationId, {
      include: [
        {
          model: CarModel,
          through: { attributes: [] },
          include: [{ model: CarType }],
        },
      ],
    });
    let brands = locationCarModels.carModels.map((car) => car.brand);
    brands = [...new Set(brands)];
    let categories = locationCarModels.carModels.map((car) => car.carType.name);
    categories = [...new Set(categories)];

    return res.json({
      id: locationCarModels.dataValues.id,
      city: locationCarModels.dataValues.city,
      latitude: locationCarModels.dataValues.latitude,
      longitude: locationCarModels.dataValues.longitude,
      brands,
      categories,
    });
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
    if (!car) return res.status(404).json({ msg: "No corresponding car!" });
    res.json(car);
  } catch (error) {
    next(error);
  }
});

router.post("/send-email", async (req, res, next) => {
  const { name, email, phone, message, subject } = req.body;
  try {
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
  } catch (error) {
    next(error);
  }
});

//////////////////////////////////////// USER ROUTES

router.get("/user", async (req, res, next) => {
  const { email } = req.query;
  try {
    let completed;
    const user = await User.findOne({ where: { email } });
    user.firstName && user.lastName && user.documentId && user.license
      ? (completed = true)
      : (completed = false);
    if (user === null) res.status(404).send({ msg: "User not found" });
    res.status(200).send({ data: user, completed });
  } catch (error) {
    next(error);
  }
});

router.post("/user", async (req, res, next) => {
  const { email } = req.body;
  try {
    const [user, created] = await User.findOrCreate({
      where: {
        email: email,
      },
    });
    let completed;
    user.firstName && user.lastName && user.documentId && user.license
      ? (completed = true)
      : (completed = false);
    if (created)
      return res.status(201).json({ msg: "User created", data: user.id, completed});
    return res.status(200).json({
      msg: "User found",
      data: user.id,      
      completed
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/user/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const v4 = new RegExp(
      /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    );
    const { firstName, lastName, documentId, license, phone, language } =
      req.body;

    if (!v4.test(id)) return res.status(406).send({ msg: "Invalid id format" });
    const user = await User.findOne({ where: { id } });
    if (user === null) return res.status(404).send({ msg: "User not found" });
    User.update(
      { firstName, lastName, documentId, license, phone },
      { where: { id } }
    );
    res.status(202).send({
      msg: "user updated",
      updatedData: {
        firstName,
        lastName,
        documentId,
        license,
        phone,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
