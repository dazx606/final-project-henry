// export default [
//     {
//         carType: "Luxury",
//         license_plate: "algo",
//         brand: "Porsche",
//         model: "Carrera 911",
//         year: 2022,
//         pricePerDay: 600,
//         passengers: 2,
//         trunk: "med",                     //ver
//         consumption: 9.3,
//         engine: 3,
//         images: []
//     },
//     { Luxury	Nissan	GTR	550	AT	4	2 med	14, 3	3, 8},
// ]
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

let car2 = new Car("Luxury", "Porsche", "carrera", 911, 2021, 600, 2, "small", 9.3, 3)
console.log(car);