const { locations } = require("./locations");


const generateCars = () => {
    const amountOFCarInLocations = locations.reduce((previous, current) => previous + current.carNum, 0);
    // const makeLicensePlates = (amount) => {
    //     const licenses = [];
    //     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    //     for (let j = 0; j < amount; j++) {
    //         let result = '';
    //         for (let i = 0; i < 6; i++) {
    //             result += characters.charAt(Math.floor(Math.random() * characters.length));
    //         }
    //         if (licenses.includes(result)) j--;
    //         else licenses.push(result);
    //     }
    //     return licenses;
    // }
    // const licensePlates = makeLicensePlates(amountOFCarInLocations);
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const licensePlates = {};
    const makeLicensePlate = () => {
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        if (licensePlates[result]) result = makeLicensePlate();
        licensePlates[result] = true;
        return result
    }

    let k = 0;
    const getLocation = () => {
        if (locations.length === 0) return null;
        if (k <= locations.length - 1) k++;
        else k = 1;
        if (locations[k - 1].carNum === 0) {
            locations.splice(k - 1, 1)
            k--;
            return getLocation();
        }
        locations[k - 1].carNum--;
        return locations[k - 1].city;
    }

    allCars = [];
    const addNewCar = (amount, carType, brand, model, year, pricePerDay, passengers, trunk, consumption, engine, includedEquipment, opcionalEquipment, images) => {
        for (let i = 0; i < amount; i++) {
            allCars.push({
                carType,
                location: getLocation(),
                license_plate: makeLicensePlate(),
                brand,
                model,
                year,
                pricePerDay,
                passengers,
                trunk,
                consumption,
                engine,
                images,
                rating: Math.floor(Math.random() * (500 - 100) + 100) / 100,
                ratingNum: Math.ceil(Math.random()*100),
                includedEquipment,
                opcionalEquipment,
            })
        }
    }
    //---------------------el array de imagenes recibe [imagenTarjeta, imagenImponente, etc...]--------------------
    addNewCar(10, "Luxury", "Porsche", "Carrera 911", 2021, 600, 2, "small", 9.3, 3, [], [], []);
    addNewCar(10, "Luxury", "Nissan", "GTR", 2020, 550, 4, "small", 14.3, 3.8, [], [], []);
    addNewCar(12, "Luxury", "Mercedes", "A-45", 2020, 380, 4, "small", 6.9, 2, [], [], []);
    addNewCar(12, "Luxury", "BMW", "M4", 2022, 380, 4, "small", 10.4, 3, [], [], []);
    addNewCar(12, "Luxury", "Audi", "RS 3", 2021, 380, 4, "small", 11.3, 2.5, [], [], []);
    addNewCar(30, "Premium", "Mazda", "6", 2020, 80, 5, "medium", 6.2, 2, [], [], []);
    addNewCar(30, "Premium", "Ford", "Fusion", 2020, 80, 5, "medium", 12.2, 2, [], [], []);
    addNewCar(30, "Premium", "VW", "Jetta", 2021, 80, 5, "medium", 9.4, 2.5, [], [], []);
    addNewCar(30, "Premium", "Ford", "Mustang", 2020, 95, 4, "small", 9.5, 5, [], [], []);
    addNewCar(30, "Premium", "Mercedes", "C-180", 2021, 110, 5, "medium", 6.4, 2, [], [], []);
    addNewCar(30, "Premium", "BMW", "320i", 2022, 110, 5, "medium", 7.3, 2, [], [], []);
    addNewCar(30, "Premium", "Audi", "A-4", 2022, 110, 5, "medium", 11.5, 2, [], [], []);
    addNewCar(30, "Pick-up", "Nissan", "Frontier", 2020, 130, 5, "large", 12.1, 2.5, [], [], []);
    addNewCar(30, "Pick-up", "Toyota", "Hilux", 2021, 130, 5, "large", 9.6, 2.8, [], [], []);
    addNewCar(30, "Pick-up", "Renault", "Alaskan", 2020, 130, 5, "large", 12.1, 2.5, [], [], []);
    addNewCar(30, "Pick-up", "VW", "Amarok", 2021, 130, 5, "large", 10.2, 2, [], [], []);
    addNewCar(30, "Pick-up", "Ford", "Raptor", 2020, 150, 5, "large", 13.4, 3.5, [], [], []);
    addNewCar(30, "Van", "Mercedes", "Sprinter", 2020, 350, 12, "large", 8.4, 3, [], [], []);
    addNewCar(30, "Van", "Dodge", "Grand caravan", 2021, 150, 7, "large", 14.1, 3.6, [], [], []);
    addNewCar(30, "Van", "Renault", "Trafic", 2020, 250, 12, "large", 7.3, 1.6, [], [], []);
    addNewCar(30, "Van", "Honda", "Odyssey", 2021, 180, 7, "large", 10.2, 3.6, [], [], []);
    addNewCar(30, "Hybrid", "Toyota", "Rav 4", 2022, 150, 5, "large", 3.5, 2.5, [], [], []);
    addNewCar(30, "Hybrid", "Kia", "Niro", 2022, 150, 5, "large", 4.4, 1.6, [], [], []);
    addNewCar(30, "Hybrid", "Toyota", "Corolla", 2020, 120, 5, "medium", 4.5, 1.6, [], [], []);
    addNewCar(30, "Hybrid", "Suzuki", "Swift", 2020, 80, 5, "small", 3.8, 1.2, [], [], []);
    addNewCar(30, "SUV Full-Size", "Toyota", "4 Runner", 2021, 130, 7, "large", 12.5, 4, [], [], []);
    addNewCar(30, "SUV Full-Size", "Nissan", "Patrol", 2022, 180, 7, "large", 14.5, 5.6, [], [], []);
    addNewCar(30, "SUV Full-Size", "Lexus", "GX 460", 2021, 200, 7, "large", 15.2, 4.6, [], [], []);
    addNewCar(30, "SUV Full-Size", "Ford", "Explorer", 2021, 140, 5, "large", 8.4, 3, [], [], []);
    addNewCar(30, "SUV Full-Size", "Jeep", "Rubicon", 2020, 150, 5, "large", 9.6, 3.6, [], [], []);
    addNewCar(30, "SUV", "Nissan", "Murano", 2022, 95, 5, "large", 11.2, 3.5, [], [], []);
    addNewCar(30, "SUV", "Mazda", "CX-9", 2022, 95, 5, "large", 11.2, 2.5, [], [], []);
    addNewCar(30, "SUV", "Chevrolet", "Blazer RS", 2021, 115, 5, "large", 15, 3.6, [], [], []);
    addNewCar(30, "SUV", "Dodge", "Durango GT", 2020, 145, 7, "large", 10.4, 3.6, [], [], []);

    if (allCars.length > amountOFCarInLocations) console.log("Too many cars and not enough space in Locations");
    return allCars;
}

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
        rating:3,
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
        rating:4, 
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
        location: "Guadalajara"
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
        location: "Cali"
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
        location: "Medellin"
    },
]


module.exports = { aFewHardcodedCars, generateCars }