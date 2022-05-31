const { Router } = require("express");
const { Op, CarModel, CarType, Driver, IncludedEquipment, IndividualCar, Location, OptionalEquipment, Payment, RentOrder, User } = require("../db.js");
require("dotenv").config();
const { EMAIL, MIDDLE_EMAIL, STRIPE_SECRET_KEY } = process.env;
const { filterDates } = require("./controllers.js");
const { transporter } = require("../config/mailer");
const express = require('express');

const router = Router();

router.get('/cars/:locationId', async (req, res, next) => {
  const { brand, category, order = "ASC", orderType = "pricePerDay", startingDate, endingDate, page = 1 } = req.query
  const { locationId } = req.params;
  const carsPerPage = 8;
  const brandFilter = brand ? { where: { brand: brand } } : { where: null };
  const categoryFilter = category ? { where: { name: category } } : { where: null };
  try {
    if (!startingDate && endingDate) return res.status(417).json({ msg: "Missing startingDate!" });
    if (new Date(startingDate) > new Date(endingDate)) return res.status(409).json({ msg: "StartingDate cannot be greater than endingDate!" });
    const locationCarModels = await Location.findByPk(locationId,
      {
        order: [[{ model: CarModel }, orderType, order]],
        include: [
          {
            model: CarModel, ...brandFilter, through: { attributes: [] }, include: [
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

    filterdCars = filterdCars.slice((page - 1) * carsPerPage, page * carsPerPage);

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
    
    return res.json({
      id: locationCarModels.dataValues.id,
      city: locationCarModels.dataValues.city,
      latitude: locationCarModels.dataValues.latitude,
      longitude: locationCarModels.dataValues.longitude,
      brands,
      categories
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
    return res.send("Message sent succesfully");
  } catch (error) {
    next(error);
  }
});

//--------------------------------------------Stripe-----------------------
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = require("stripe")(STRIPE_SECRET_KEY);

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

router.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});






const handlePaymentIntentSucceeded = (paymentIntent) => {
  console.log(paymentIntent);
}

// If you are testing with the CLI, find the secret by running 'stripe listen'
// If you are using an endpoint defined with the API or dashboard, look in your webhook settings
// at https://dashboard.stripe.com/webhooks
const endpointSecret = 'whsec_f7b05fa6764aea656657592e3cb885b166467970e77a593f147c238304afc9d2';


router.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  let event = request.body;
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  // if (endpointSecret) {
  //   // Get the signature sent by Stripe
  //   const signature = request.headers['stripe-signature'];
  //   try {
  //     event = stripe.webhooks.constructEvent(
  //       request.body,
  //       signature,
  //       endpointSecret
  //     );
  //   } catch (err) {
  //     console.log(`⚠️  Webhook signature verification failed.`, err.message);
  //     return response.sendStatus(400);
  //   }
  // }

  // Handle the event
  switch (event.type) {
    case 'charge.succeeded':
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      // Then define and call a method to handle the successful payment intent.
      handlePaymentIntentSucceeded(paymentIntent);
      break;
    case 'payment_intent.created':
      const paymentMethod = event.data.object;
      console.log(event.data.object);
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

module.exports = router;