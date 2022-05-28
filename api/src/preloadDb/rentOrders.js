const rentOrders = [
    {
        startingDate: "2022-08-08",
        endingDate: "2022-08-20",
        user: "unemail1@gmail.com",
        car: "500",
        drivers: ["persona1", "persona2"],
        optionalEquipment: ["GPS"],
        endLocation: "Buenos Aires"
    },
    {
        startingDate: "2022-10-08",
        endingDate: "2023-02-03",
        user: "unemail2@gmail.com",
        car: "500",
        drivers: ["persona3"],
        optionalEquipment: [],
        endLocation: "Rosario"
    },
    {
        startingDate: "2022-07-07",
        endingDate: "2022-07-08",
        user: "unemail3@gmail.com",
        car: "500",
        drivers: ["persona5"],
        optionalEquipment: ["GPS", "Child seat", "Baby seat"],
        endLocation: "Cali"
    },
    {
        startingDate: "2022-08-02",
        endingDate: "2022-08-11",
        user: "unemail3@gmail.com",
        car: "486",
        drivers: ["persona5"],
        optionalEquipment: ["GPS", "Child seat", "Baby seat"],
        endLocation: "Cali"
    }
]

module.exports = { rentOrders }