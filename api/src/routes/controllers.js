const { Op, CarModel, CarType, Driver, IncludedEquipment, IndividualCar, Location, OptionalEquipment, Payment, RentOrder, User } = require('../db.js');

const datePlus = (date, num) => {
    return new Date(new Date(date.getTime()).setDate(new Date(date.getTime()).getDate() + num))
}

const getDatesInRange = (startDate, endDate) => {
    const date = new Date(startDate.getTime());
    const dates = [];
    while (date <= endDate) {
        dates.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return dates;
}

const filterDates = (cars, startingDate, endingDate) => {
    const userInterval = endingDate ? getDatesInRange(new Date(startingDate), new Date(endingDate))
        : new Date(startingDate).toDateString();
    return cars.filter(c => {
        if (c.individualCars > c.existingRents.length) return true;
        let i = 0;
        let availableCar = false;
        while (availableCar === false && i < c.existingRents.length) {
            let j = 0;
            didFind = false;
            while (didFind === false && j < c.existingRents[i].length) {
                let dateInterval = c.existingRents[i][j];
                dateInterval = getDatesInRange(new Date(dateInterval.startingDate), new Date(dateInterval.endingDate));
                if (endingDate) {
                    userInterval.forEach(ud => { if (dateInterval.find((d) => d.toDateString() === ud.toDateString())) didFind = true })
                } else {
                    if (dateInterval.find((d) => d.toDateString() === userInterval)) didFind = true;
                }
                j++;
            }
            if (!didFind) availableCar = true;
            i++;
        }
        return availableCar;
    })
}

const filterRentDates = (LocationCars, startingDate, endingDate) => {
    const userInterval = getDatesInRange(new Date(startingDate), endingDate)
    LocationCars.carModels[0].individualCars = LocationCars.carModels[0].individualCars.filter(c => {
        let i = 0;
        let availableCar = true;
        while (availableCar && i < c.rentOrders.length) {
            const currentInterval = c.rentOrders[i]
            const dateInterval = getDatesInRange(new Date(currentInterval.startingDate), new Date(currentInterval.endingDate));
            userInterval.forEach(ud => { if (dateInterval.find((d) => d.toDateString() === ud.toDateString())) availableCar = false })
            i++;
        }
        return availableCar;
    })
    return LocationCars
}


module.exports = {
    datePlus,
    getDatesInRange,
    filterDates,
    filterRentDates,
}