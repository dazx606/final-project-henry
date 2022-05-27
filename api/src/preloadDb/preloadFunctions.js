const { Op, Car, CarType, Driver, IncludedEquipment, Location, OptionalEquipment, Payment, RentOrder, User } = require("../db.js");
const { locations } = require("./locations");
const { carTypes } = require("./carTypes");
const { includedEquipments } = require("./includedEquipments");
const { optionalEquipments } = require("./optionalEquipments");
const { generateCars } = require("./cars");


const preloadLocation = async () => {
    try {
        await Promise.all(locations.map(l => Location.findOrCreate({
            where: { city: l.city },
            defaults: { city: l.city, latitude: l.latitude, longitude: l.longitude }
        })))
    } catch (error) {
        throw new Error(error);
    }
};

const preloadCarType = async () => {
    try {
        await Promise.all(carTypes.map(t => CarType.findOrCreate({ where: { name: t }, })))
    } catch (error) {
        throw new Error(error);
    }
};

const preloadIncludedEquipment = async () => {
    try {
        await Promise.all(includedEquipments.map(e => IncludedEquipment.findOrCreate({ where: { name: e }, })))
    } catch (error) {
        throw new Error(error);
    }
};

const preloadOptionalEquipment = async () => {
    try {
        await Promise.all(optionalEquipments.map(e => OptionalEquipment.findOrCreate({ where: { name: e }, })))
    } catch (error) {
        throw new Error(error);
    }
};

const preloadCar = async () => {
    try {
        const cars = generateCars();
        await Promise.all(cars.map(async c => {
            const newCar = await Car.findOrCreate({
                where: { license_plate: c.license_plate },
                defaults: {
                    license_plate: c.license_plate,
                    brand: c.brand,
                    model: c.model,
                    year: c.year,
                    pricePerDay: c.pricePerDay,
                    passengers: c.passengers,
                    trunk: c.trunk,
                    consumption: c.consumption,
                    engine: c.engine,
                    images: c.images,
                    rating: c.rating,
                    ratingNum: c.ratingNum,
                }
            })
            if (newCar[1]) {
                const newCarType = await CarType.findOne({ where: { name: c.carType } });
                if (newCarType) await newCarType.addCar(newCar[0]);
                const newCarLocation = await Location.findOne({ where: { city: c.location } });
                if (newCarLocation) await newCarLocation.addCar(newCar[0]);
                if (c.includedEquipment.length) {
                    await Promise.all(c.includedEquipment.map((e) => IncludedEquipment.findOne({ where: { name: e } })))
                        .then(equipments => newCar[0].addIncludedEquipments(equipments))
                }
                if (c.opcionalEquipment.length) {
                    await Promise.all(c.opcionalEquipment.map((e) => OptionalEquipment.findOne({ where: { name: e } })))
                        .then(equipments => newCar[0].addOptionalEquipments(equipments))
                }
            }
        }
        ))
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
}