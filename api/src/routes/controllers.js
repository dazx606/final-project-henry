const { Op, CarModel, CarType, Driver, IncludedEquipment, IndividualCar, Location, OptionalEquipment, Payment, RentOrder, User } = require('../db.js');

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


module.exports = {
    getDatesInRange,
    filterDates,
}