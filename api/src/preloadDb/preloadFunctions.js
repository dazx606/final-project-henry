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
const { locations } = require("./locations");
const { carTypes } = require("./carTypes");
const { includedEquipments } = require("./includedEquipments");
const { optionalEquipments } = require("./optionalEquipments");
const { generateCars } = require("./cars");
const { drivers } = require("./drivers");
const { users } = require("./users");
const { rentOrders } = require("./rentOrders");

require("dotenv").config();
const { STRIPE_SECRET_KEY } = process.env;
const stripe = require("stripe")(STRIPE_SECRET_KEY);

const createStripeIdCarModel = async (car) => {
  try {
    if (car.stripePriceId) return;
    const product = await stripe.products.create({
      name: `${car.brand} ${car.model}`,
    });
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: car.pricePerDay * 100,
      currency: "usd",
    });
    console.log(
      `The product _____${car.brand} ${car.model}_____ was created succesfully StripeId:\n"${price.id}"`
    );
  } catch (error) {
    throw new Error(error);
  }
};

const preloadLocation = async () => {
  try {
    await Promise.all(
      locations.map((l) =>
        Location.findOrCreate({
          where: { city: l.city },
          defaults: {
            city: l.city,
            latitude: l.latitude,
            longitude: l.longitude,
          },
        })
      )
    );
  } catch (error) {
    throw new Error(error);
  }
};

const preloadCarType = async () => {
  try {
    await Promise.all(
      carTypes.map((t) => CarType.findOrCreate({ where: { name: t } }))
    );
  } catch (error) {
    throw new Error(error);
  }
};

const preloadIncludedEquipment = async () => {
  try {
    await Promise.all(
      includedEquipments.map((e) =>
        IncludedEquipment.findOrCreate({ where: { name: e } })
      )
    );
  } catch (error) {
    throw new Error(error);
  }
};

const preloadOptionalEquipment = async () => {
  try {
    await Promise.all(
      optionalEquipments.map((e) =>
        OptionalEquipment.findOrCreate({
          where: { name: e.name },
          defaults: {
            name: e.name,
            price: e.price,
            stripePriceId: e.stripePriceId,
          },
        })
      )
    );
  } catch (error) {
    throw new Error(error);
  }
};

const preloadCar = async () => {
  try {
    const cars = generateCars();
    await Promise.all(
      cars.map(async (c) => {
        const newModel = await CarModel.findOrCreate({
          where: { model: c.model },
          defaults: {
            brand: c.brand,
            model: c.model,
            pricePerDay: c.pricePerDay,
            stripePriceId: c.stripePriceId,
            passengers: c.passengers,
            trunk: c.trunk,
            consumption: c.consumption,
            engine: c.engine,
            images: c.images,
            rating: Math.floor(Math.random() * (500 - 100) + 100) / 100,
            ratingNum: Math.ceil(Math.random() * 10),
            description: c.description
          },
        });
        const newIndividualCar = await IndividualCar.findOrCreate({
          // where: { id: c.id },
          // defaults: { id: c.id, license_plate: c.license_plate, year: c.year },
          where: { license_plate: c.license_plate },
          defaults: { license_plate: c.license_plate, year: c.year },
        });
        if (newIndividualCar[1]) {
          await newModel[0].addIndividualCar(newIndividualCar[0]);
          const newCarLocation = await Location.findOne({
            where: { city: c.location },
          });
          if (newCarLocation) {
            await newCarLocation.addIndividualCar(newIndividualCar[0]);
            try {
              await newCarLocation.addCarModel(newModel[0]);
            } catch (error) {}
          }
        }
        if (newModel[1]) {
          const newCarType = await CarType.findOne({
            where: { name: c.carType },
          });
          if (newCarType) await newCarType.addCarModel(newModel[0]);
          if (c.includedEquipment.length) {
            await Promise.all(
              c.includedEquipment.map((e) =>
                IncludedEquipment.findOne({ where: { name: e } })
              )
            ).then((equipments) =>
              newModel[0].addIncludedEquipments(equipments)
            );
          }
          if (c.opcionalEquipment.length) {
            await Promise.all(
              c.opcionalEquipment.map((e) =>
                OptionalEquipment.findOne({ where: { name: e } })
              )
            ).then((equipments) =>
              newModel[0].addOptionalEquipments(equipments)
            );
          }
          createStripeIdCarModel(c);
        }
      })
    );
  } catch (error) {
    throw new Error(error);
  }
};

const preloadDriver = async () => {
  try {
    await Promise.all(
      drivers.map((d) =>
        Driver.findOrCreate({
          where: { firstName: d.firstName },
          defaults: {
            firstName: d.firstName,
            lastName: d.lastName,
            licenseNumber: d.licenseNumber,
            documentId: d.documentId,
          },
        })
      )
    );
  } catch (error) {
    throw new Error(error);
  }
};

const preloadUser = async () => {
  try {
    await Promise.all(
      users.map(async (u) => {
        const newUser = await User.findOrCreate({
          where: { email: u.email },
          defaults: {
            email: u.email,
            firstName: u.firstName,
            lastName: u.lastName,
            documentId: u.documentId,
            license: u.license,
            admin: u.admin ? u.admin : null,
            picture: u.picture ? u.picture : null,
          },
        });
        if (newUser[1] && u.drivers?.length) {
          await Promise.all(
            u.drivers.map((d) => Driver.findOne({ where: { firstName: d } }))
          ).then((driver) => newUser[0].addDrivers(driver));
        }
      })
    );
  } catch (error) {
    throw new Error(error);
  }
};

const preloadRentOrder = async () => {
  try {
    await Promise.all(
      rentOrders.map(async (r) => {
        const newRentOrder = await RentOrder.findOrCreate({
          where: { startingDate: r.startingDate },
          defaults: {
            startingDate: r.startingDate,
            endingDate: r.endingDate,
            status: r.status,
          },
        });
        if (newRentOrder[1]) {
          const user = await User.findOne({ where: { email: r.user } });

          await user.addRentOrder(newRentOrder[0]);
          if (r.drivers?.length) {
            await Promise.all(
              r.drivers.map((d) => Driver.findOne({ where: { firstName: d } }))
            ).then((driver) => newRentOrder[0].addDrivers(driver));
          }
          const car = await IndividualCar.findOne({ where: { id: r.car } });
          await car?.addRentOrder(newRentOrder[0]);
          if (r.optionalEquipment?.length) {
            await Promise.all(
              r.optionalEquipment.map((e) =>
                OptionalEquipment.findOne({ where: { name: e } })
              )
            ).then((equip) => newRentOrder[0].addOptionalEquipments(equip));
          }
          const location = await Location.findOne({
            where: { city: r.endLocation },
          });
          await location.addRentOrder(newRentOrder[0]);
        }
      })
    );
  } catch (error) {
    throw new Error(error);
  }
};

const createStripeIdEquip = async () => {
  try {
    await Promise.all(
      optionalEquipments.map(async (e) => {
        if (e.stripePriceId) return;
        const product = await stripe.products.create({ name: e.name });
        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: e.price * 100,
          currency: "usd",
        });
        console.log(
          `The product _____${e.name}_____ was created succesfully StripeId:\n"${price.id}"`
        );
      })
    );
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  preloadLocation,
  preloadCarType,
  preloadIncludedEquipment,
  preloadOptionalEquipment,
  preloadCar,
  preloadDriver,
  preloadUser,
  preloadRentOrder,
  createStripeIdEquip,
};
