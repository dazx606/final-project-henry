const rentOrders = [
    {
        startingDate: "2022/06/04",
        endingDate: "2022/08/20",
        user: "rentacarg7@gmail.com",
        car: "500",
        drivers: ["persona1", "persona2"],
        optionalEquipment: ["GPS"],
        endLocation: "Buenos Aires",
        status:"pending",
    },
    {
        startingDate: "2022/04/04",
        endingDate: "2022/06/07",
        user: "rentacarg7@gmail.com",
        car: "500",
        drivers: ["persona3"],
        optionalEquipment: [],
        endLocation: "Rosario",
        status:"maintenance",
    },
    {
        startingDate: "2022/07/7",
        endingDate: "2022/07/8",
        user: "rentacarg7@gmail.com",
        car: "500",
        drivers: ["persona5"],
        optionalEquipment: ["GPS", "Child seat", "Baby seat"],
        endLocation: "Cali",
        status:"canceled",
    },
    {
        startingDate: "2022/08/2",
        endingDate: "2022/08/11",
        user: "rentacarg7@gmail.com",
        car: "486",
        drivers: ["persona5"],
        optionalEquipment: ["GPS", "Child seat", "Baby seat"],
        endLocation: "Cali",
        status:"pending",
    }
]

module.exports = { rentOrders }