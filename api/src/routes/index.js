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

  const infoFormatter = (info) => {
    return info.carModels.map(c => {
      return {
        ...c.dataValues,
        carType: c.carType.dataValues.name,
        includedEquipments: c.includedEquipments.map(e => e.dataValues.name),
        optionalEquipments: c.optionalEquipments.map(e => e.dataValues.name),
      }
    });
  }

  try {
  //   let carLocation = await Location.findByPk(
  //     locationId,
  //     {
  //       include: [
  //         {
  //           model: CarModel,
  //           through: { attributes: [] },
  //           include: [
  //             { model: CarType },
  //             { model: IncludedEquipment, attributes: ["name"], through: { attributes: [] } },
  //             { model: OptionalEquipment, attributes: ["name"], through: { attributes: [] } },
  //           ]
  //         },
  //       ]
  //     }
  //   )
  //   carLocation = carLocation.carModels.map(c => {
  //     return {
  //       ...c.dataValues,
  //       carType: c.carType.dataValues.name,
  //       includedEquipments: c.includedEquipments.map(e => e.dataValues.name),
  //       optionalEquipments: c.optionalEquipments.map(e => e.dataValues.name),
  //     }
  //   });

  //   if(brand) carLocation = carLocation.filter(c => c.brand === brand);
  //   if(category) carLocation = carLocation.filter(c => c.carType === category);

  //   if (orderType === "rating") {
  //     carLocation.sort((a, b) => a.rating - b.rating);
  //   } else {
  //     carLocation.sort((a, b) => a.pricePerDay - b.pricePerDay);
  //   }
  //   if (order === "DESC") carLocation.reverse();

  //   return res.json(carLocation);
    if (brand && category) {

      const locationCarModels = await Location.findByPk(
        locationId,
        {
          order: [[{ model: CarModel }, orderType, order]],
          include: [
            {
              model: CarModel, where: { brand: brand }, through: { attributes: [] },  include: [
                { model: CarType, where: { name: category }, attributes: { exclude: ['id'] }},
                { model: IncludedEquipment, attributes: ['name'], through: { attributes: [] } },
                { model: OptionalEquipment, attributes: ['name'], through: { attributes: [] } }
              ]
            },
          ]
        }
      )
      return res.json(infoFormatter(locationCarModels));
    }
    if (brand) {
      const locationCarModels = await Location.findByPk(
        locationId,
        {
          order: [[{ model: CarModel }, orderType, order]],
          include: [
            {
              model: CarModel, where: { brand: brand }, include: [
                { model: CarType, attributes: { exclude: ['id'] } },
                { model: IncludedEquipment, attributes: ['name'], through: { attributes: [] } },
                { model: OptionalEquipment, attributes: ['name'], through: { attributes: [] } }
              ]
            },
          ]
        }
      )
      return res.json(infoFormatter(locationCarModels));
    }
    if (category) {
      const locationCarModels = await Location.findByPk(
        locationId,
        {
          order: [[{ model: CarModel }, orderType, order]],
          include: [
            {
              model: CarModel, include: [
                { model: CarType, where: { name: category }, attributes: { exclude: ['id'] } },
                { model: IncludedEquipment, attributes: ['name'], through: { attributes: [] } },
                { model: OptionalEquipment, attributes: ['name'], through: { attributes: [] } }
              ]
            },
          ]
        }
      )
      return res.json(infoFormatter(locationCarModels));
    }
    // if (orderType) {
    //   const onlyOrder = await CarModel.findAll({
    //     where: { locationId: locationId },
    //     limit: carsPerPage,
    //     offset: page * carsPerPage,
    //     order: [[orderType, order]],
    //     include: [
    //       { model: CarType },
    //       { model: Location },
    //       { model: IncludedEquipment, attributes: ["name"], through: { attributes: [] } },
    //       { model: OptionalEquipment, attributes: ["name"], through: { attributes: [] } },
    //     ],
    //   });
    //   return res.json(onlyOrder);
    // }
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
