const { Router } = require("express");
const { Op, CarModel, CarType, Driver, IncludedEquipment, IndividualCar, Location, OptionalEquipment, Payment, RentOrder, User } = require("../db.js");
require("dotenv").config();
const { EMAIL, MIDDLE_EMAIL, STRIPE_SECRET_KEY } = process.env;
const { filterDates } = require("./controllers.js");
const { transporter } = require("../config/mailer");

const router = Router();

router.get('/cars/:locationId', async (req, res, next) => {
  const { brand, category, order = "ASC", orderType = "pricePerDay", startingDate, endingDate, page = 1, model, carsPerPage=8 } = req.query
  const { locationId } = req.params;
  const brandModelFilter = brand ? { where: { brand: brand } } : { where: null };
  const categoryFilter = category ? { where: { name: category } } : { where: null };
  if(model) brandModelFilter.where.model = model
  
  try {
    if (!startingDate && endingDate) return res.status(417).json({ msg: "Missing startingDate!" });
    if (new Date(startingDate) > new Date(endingDate)) return res.status(409).json({ msg: "StartingDate cannot be greater than endingDate!" });
    const locationCarModels = await Location.findByPk(locationId,
      {
        order: [[{ model: CarModel }, orderType, order]],
        include: [
          {
            model: CarModel, ...brandModelFilter, through: { attributes: [] }, include: [
              { model: CarType, ...categoryFilter, attributes: { exclude: ['id'] } },
              { model: IncludedEquipment, attributes: ['name'], through: { attributes: [] } },
              { model: OptionalEquipment, attributes: ['name'], through: { attributes: [] } },
              { model: IndividualCar, where: { locationId }, attributes: ['id'], include: [{ model: RentOrder, attributes: ['startingDate', 'endingDate'] }] }
            ]
          },
        ]
      }
    )

    if (!locationCarModels?.carModels.length) return res.status(404).json({ msg: "No corresponding car found!" });

    let filterdCars = locationCarModels.carModels.map(c => {
      const existingRents = [];
      c.individualCars.forEach(r => { if (r.rentOrders.length) existingRents.push(r.rentOrders) });
      return {
        ...c.dataValues,
        carType: c.carType.dataValues.name,
        includedEquipments: c.includedEquipments.map(e => e.dataValues.name),
        optionalEquipments: c.optionalEquipments.map(e => e.dataValues.name),
        individualCars: c.individualCars.length,
        existingRents,
      }
    })

    if (startingDate) filterdCars = filterDates(filterdCars, startingDate, endingDate);

    if (!filterdCars.length) return res.status(404).json({ msg: "No corresponding car found!" });

    if(parseInt(carsPerPage))filterdCars = filterdCars.slice((page - 1) * carsPerPage, page * carsPerPage);
    
    return res.json(filterdCars);
  } catch (error) {
    next(error);
  }
});
//---------------------------------------------------------------------------------------------------------------
router.get("/locationCars/:locationId", async (req, res, next) => {
  const { locationId } = req.params;
  try {
    const locationCarModels = await Location.findByPk(
      locationId,
      {
        include: [
          {
            model: CarModel,
            through: { attributes: [] },
            include: [{ model: CarType }]
          },
        ]
      }
    )
    let brands = locationCarModels.carModels.map((car) => car.brand);
    brands = [...new Set(brands)];
    let categories = locationCarModels.carModels.map((car) => car.carType.name);
    categories = [...new Set(categories)];
    let models = locationCarModels.carModels.map((car) => `${car.brand} ${car.model}`);
    models = [...new Set(models)];

    return res.json({
      id: locationCarModels.dataValues.id,
      city: locationCarModels.dataValues.city,
      latitude: locationCarModels.dataValues.latitude,
      longitude: locationCarModels.dataValues.longitude,
      brands,
      categories,
      models
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
      from: `RC G7 Contact Us <${MIDDLE_EMAIL}>`,
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
//------------------------------------------------Stripe--------------------------------


// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = require('stripe')(STRIPE_SECRET_KEY);

const YOUR_DOMAIN = 'http://localhost:3000/booking';

router.post('/create-checkout-session', async (req, res, next) => {
  try {
    const { numberOfDays, carPriceId, optionalEquipment = [] } = req.body;   //{numberOfDays, carPriceId, optionalEquipment:[GPSPriceId,childSeatPriceId,etc]}
    if (!numberOfDays || !carPriceId) return res.status(400).json("Missing information!!!");
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: carPriceId,
          quantity: numberOfDays,
        },
        ...optionalEquipment.map(id => ({ price: id, quantity: numberOfDays })),
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });


    
    res.redirect(303, session.url);
  } catch (error) {
    next(error);
  }
});

module.exports = router;