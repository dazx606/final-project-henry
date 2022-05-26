class Car {
    constructor(carType, brand, model, year, pricePerDay, passengers, trunk, consumption, engine, images, includedEquipment, opcionalEquipment) {
        this.carType = carType;
        this.license_plate = "algo";
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.pricePerDay = pricePerDay;
        this.passengers = passengers;
        this.trunk = trunk;
        this.consumption = consumption;
        this.engine = engine;
        this.images = images;
        this.includedEquipment = includedEquipment;
        this.opcionalEquipment = opcionalEquipment;

    }
}

// let car = new Car("Luxury", "Porsche", "carrera", 911, 2021, 600, 2, "small", 9.3, 3)
// console.log(car);

const aFewHardcodedCars = [
    {
        carType: "Luxury",

        license_plate: "98ABC33",
        brand: "Porsche",
        model: "Carrera 911",
        year: 2021,
        pricePerDay: 600,
        passengers: 2,
        trunk: "small",
        consumption: 9.3,
        engine: 3,
        images: [],

        location:"Córdoba"
    },
    {
        carType: "Luxury",
        license_plate: "22PSM55",
        brand: "Porsche",
        model: "GTR",
        year: 2020,
        pricePerDay: 550,
        passengers: 4,
        trunk: "medium",
        consumption: 14.3,
        engine: 3.8,
        images: [],
        location:"Córdoba"
    },
    {
        carType: "Luxury",
        license_plate: "11PNG61",
        brand: "Mercedes",
        model: "A-45",
        year: 2020,
        pricePerDay: 380,
        passengers: 4,
        trunk: "small",
        consumption: 6.9,
        engine: 2,
        images: [],
        location:"Guadalajara"
    },
    {
        carType: "Premium",
        license_plate: "33PNG61",
        brand: "Renato",
        model: "A-45",
        year: 2020,
        pricePerDay: 380,
        passengers: 4,
        trunk: "large",
        consumption: 6.9,
        engine: 2,
        images: [],
        location:"Cali"
    },
    {
        carType: "Hybrid",
        license_plate: "43PNG61",
        brand: "RenatoRaro",
        model: "rarito",
        year: 0,
        pricePerDay: 2,
        passengers: 50,
        trunk: "small",
        consumption: 120.33,
        engine: 8,
        images: ["estoesunaimagen", "estatambien"],
        location:"Medellin"
    },
]


module.exports = {aFewHardcodedCars}