const rentOrders = [
    {
        startingDate: "2022-08-08",
        endingDate: "2022-08-20",
        user: "unemail1@gmail.com",
        car: "Trafic",
        drivers: ["persona1", "persona2"],
        optionalEquipment: ["GPS"],
        endLocation: "Buenos Aires"
    },
    {
        startingDate: "2022-10-08",
        endingDate: "2023-02-03",
        user: "unemail2@gmail.com",
        car: "Rav 4",
        drivers: ["persona3"],
        optionalEquipment: [],
        endLocation: "Rosario"
    },
    {
        startingDate: "2022-7-07",
        endingDate: "2022-7-08",
        user: "unemail3@gmail.com",
        car: "Explorer",
        drivers: ["persona5"],
        optionalEquipment: ["GPS", "Child seat", "Baby seat"],
        endLocation: "Cali"
    }
]

module.exports = { rentOrders }