const { Router } = require("express");
const express = require("express");
const {
  Op,
  CarModel,
  CarType,
  Driver,
  IncludedEquipment,
  IndividualCar,
  Location,
  OptionalEquipment,
  RentOrder,
  User,
} = require("../db.js");
require("dotenv").config();
const { EMAIL, MIDDLE_EMAIL, STRIPE_SECRET_KEY, STRIPE_SECRET_WEBHOOK_KEY } =
  process.env;
const { filterDates, statusUpdater, rentUpdate } = require("./controllers.js");
const { transporter } = require("../config/mailer");
const userRouter = require("./user");
const adminRouter = require("./admin");
const rentRouter = require("./rent");
const YOUR_DOMAIN = "http://localhost:3000";  //DIRECCION DEL FRONT

const endpointSecret = STRIPE_SECRET_WEBHOOK_KEY;
const stripe = require("stripe")(STRIPE_SECRET_KEY);

const router = Router();
router.use("/user", userRouter);
router.use("/admin", adminRouter);
router.use("/rent", rentRouter);

router.get("/cars/:locationId", async (req, res, next) => {
  const {
    brand,
    category,
    order = "ASC",
    orderType = "pricePerDay",
    startingDate,
    endingDate,
    page = 1,
    model,
    carsPerPage = 8,
  } = req.query;
  // const allowedStatus = ["pending", "in use", "maintenance"];
  const notAllowedStatus = ["canceled", "concluded"];
  const { locationId } = req.params;
  const brandModelFilter = brand
    ? { where: { brand: brand } }
    : { where: null };
  const categoryFilter = category
    ? { where: { name: category } }
    : { where: null };
  if (model) brandModelFilter.where.model = model;

  try {
    await statusUpdater();
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
          ...brandModelFilter,
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
                  attributes: ["startingDate", "endingDate", "status"],
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
        if (r.rentOrders.length) {
          const rents = [];
          r.rentOrders.forEach((individualRent) => {
            if (!notAllowedStatus.includes(individualRent.dataValues.status)) {
              rents.push(individualRent);
            }
          });
          if (rents.length) {
            existingRents.push(rents);
          }
        }
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

    let result = {
      pagination: {
        page,
        pageNum: 1,
      },
      models: filterdCars,
    };
    if (parseInt(carsPerPage)) {
      result.models = filterdCars.slice(
        (page - 1) * carsPerPage,
        page * carsPerPage
      );
      result.pagination.pageNum = Math.ceil(filterdCars.length / carsPerPage);
    }

    return res.json(result);
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
    let models = locationCarModels.carModels.map(
      (car) => `${car.brand} ${car.model}`
    );
    models = [...new Set(models)];

    return res.json({
      id: locationCarModels.dataValues.id,
      city: locationCarModels.dataValues.city,
      latitude: locationCarModels.dataValues.latitude,
      longitude: locationCarModels.dataValues.longitude,
      brands,
      categories,
      models,
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

router.get("/models", async (req, res, next) => {
  try {
    const models = await CarModel.findAll({
      order: [["model", "ASC"]],
    });
    const names = models.map((item) => item.model);
    return res.json(names);
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
          attributes: ["name", "price"],
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
//-------------------------------------------------Node-mailer----------------------
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
      from: `Luxurent Contact Us <${MIDDLE_EMAIL}>`,
      to: EMAIL,
      subject: subject ? subject : "No subject",
      html: contentHTML,
      replyTo: email,
    });
    return res.json("Message sent succesfully");
  } catch (error) {
    next(error);
  }
});
//----------------------------------STIPE WEBHOOK----------------------------------
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (req, res, next) => {
    const payload = req.body;

    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.log(`❌ Error message: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
      if (event.type === "checkout.session.completed") {
        // console.log(event.data.object);
        const stripeObject = event.data.object;
        rentUpdate(stripeObject);
      }
      return res.json({ received: true });
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;
