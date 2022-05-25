const { Op, Car, CarType, Driver, IncludedEquipment, Location, OptionalEquipment, Payment, RentOrder, User } = require("../db.js");
const { locations } = require("./locations");


const preloadLocation = async () => {
    try {
        await Promise.all(locations.map(async (l) => await Location.findOrCreate({
            where: { city: l.city },
            defaults: { city: l.city, latitude: l.latitude, longitude: l.longitude }
        })))
        console.log(1);
    } catch (error) {
        throw new Error(error);
    }
};

const preloadCar = async () => {
    try {
        console.log(2);

    } catch (error) {
        throw new Error(error);
    }
};
module.exports = {
    preloadLocation,
    preloadCar,
}