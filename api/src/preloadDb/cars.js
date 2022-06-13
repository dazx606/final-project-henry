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

    let j = 0;
    allCars = [];
    const addNewCar = (amount, carType, brand, model, year, pricePerDay, passengers, trunk, consumption, engine, includedEquipment, opcionalEquipment, images, stripePriceId, description) => {
        for (let i = 0; i < amount; i++) {
            allCars.push({
                id: j++,
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
                includedEquipment,
                opcionalEquipment,
                stripePriceId,
                description
            })
        }
    }
    //---------------------el array de imagenes recibe [imagenTarjeta, imagenImponente, etc...]--------------------
    addNewCar(10, "Luxury", "Porsche", "Carrera 911", 2021, 600, 2, "small", 9.3, 3, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS"], [
        "https://i.ibb.co/RNc93C9/911-T2.png", "https://i.ibb.co/n6KsBxP/911-1.jpg", "https://i.ibb.co/sKyJFjm/911-5.jpg",
        "https://i.ibb.co/Ypd5Ndb/911-4.jpg", "https://i.ibb.co/9VcqyVb/911-3.jpg", "https://i.ibb.co/F3K31rM/911-2.png",
        "https://i.ibb.co/Wf5H2qg/911-1.png"
    ], "price_1L5fFjDNuL2bCfdEtzBclG12",
    'Serving up incredibly fast and smooth gear changes. It’s one of the best of its type in the business. It’s particularly satisfying in manual mode, when you can use the wheel-mounted paddles for greater control.'
    );
    addNewCar(10, "Luxury", "Nissan", "GTR", 2020, 550, 4, "small", 14.3, 3.8, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS"], [
        "https://i.ibb.co/G2C77P1/GTR-T.png", "https://i.ibb.co/ysqvh8n/GTR-I.jpg", "https://i.ibb.co/BVQHLBb/GTR-2.jpg",
        "https://i.ibb.co/gzpW2Gv/GTR-1.jpg"
    ], "price_1L5fKqDNuL2bCfdEISnTN8Mm","The Nissan GT-R (Japanese: 日産・GT-R, Nissan GT-R), is a high-performance sports car and grand tourer produced by Nissan unveiled in 2007.[3][4][5] It is the successor to the Skyline GT-R, a high performance variant of the Nissan Skyline." );
    addNewCar(12, "Luxury", "Mercedes", "A-45", 2020, 380, 4, "small", 6.9, 2, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS"], [
        "https://i.ibb.co/1MGsxnp/A45-T.png", "https://i.ibb.co/zPYw4sp/A45-I.jpg", "https://i.ibb.co/gZpkyrM/A45-4.jpg",
        "https://i.ibb.co/gtfT5pG/A45-3.jpg", "https://i.ibb.co/r0z6pZy/A45-2.jpg"
    ], "price_1L5fKqDNuL2bCfdEJL8cWU44", "Powering the Mercedes A45 AMG is a masterpiece of an engine. The 2.0-litre turbocharged four-cylinder unit produces 360hp and a generous 332lb ft of torque. With the help of a seven-speed dual-clutch gearbox and sophisticated four-wheel drive, the 0-60 time is only 4.3 seconds");
    addNewCar(12, "Luxury", "BMW", "M4", 2022, 380, 4, "small", 10.4, 3, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS"], [
        "https://i.ibb.co/2vGp5M7/M4-T.png", "https://i.ibb.co/6RnT5HT/M4-I.png", "https://i.ibb.co/5vTVBBv/M4-3.jpg",
        "https://i.ibb.co/RT6ZqHR/M4-2.jpg", "https://i.ibb.co/0Mbs49T/M4-1.jpg"
    ], "price_1L5fKqDNuL2bCfdEmUvn5vz8", "The M4 has high levels of comfort, luxury, and daily usability and a reasonably roomy rear seat should you need them. Power and grip are two areas where the BMW M4 shines. ");
    addNewCar(12, "Luxury", "Audi", "RS 3", 2021, 380, 4, "small", 11.3, 2.5, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS"], [
        "https://i.ibb.co/mzrxD0B/RS-T.png", "https://i.ibb.co/wKF9Tfp/RS-I.jpg", "https://i.ibb.co/CKVgZg7/RS-1.jpg",
        "https://i.ibb.co/jRHMJ44/RS-2.jpg", "https://i.ibb.co/sVTVhNY/RS-3.png"
    ], "price_1L5fLeDNuL2bCfdE7zh6ItiX", "The Audi RS 3 offers driving dynamics on the highest level and optimum values in its segment. With a 400-hp five-cylinder engine that generates 500 Nm of torque, the car ensures quick acceleration and highly emotional sound.");
    addNewCar(30, "Premium", "Mazda", "6", 2020, 80, 5, "medium", 6.2, 2, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/dj8wgpD/MZD6-T.png", "https://i.ibb.co/C15xMBD/MZD6-I.jpg", "https://i.ibb.co/StKL6ky/MZD-4.jpg",
        "https://i.ibb.co/0Yc5L3z/MZD-3.jpg", "https://i.ibb.co/xmph3Hr/MZD-2.jpg", "https://i.ibb.co/JCktHPY/MZD-1.jpg"
    ], "price_1L5fLeDNuL2bCfdEf0SxThDE", "Well-rounded performance and a high-end cabin help the Mazda6 land near the top of the midsize car class.");
    addNewCar(30, "Premium", "Ford", "Fusion", 2020, 80, 5, "medium", 12.2, 2, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/8DnVbHx/Fusion-T-removebg-preview.png", "https://i.ibb.co/fqjMFsf/Fusion-I.jpg", "https://i.ibb.co/kBKWn2L/Fusion-3.jpg",
        "https://i.ibb.co/HH57n2G/Fusion-2.jpg", "https://i.ibb.co/zP3BN7F/Fusion-1.jpg", ""
    ], "price_1L5fLeDNuL2bCfdEBB5R9pTY", "The Ford Fusion is a well-rounded sedan with spirited handling and a roomy cabin, but its fuel economy is below average, and it has the lowest safety score in the midsize car class.");
    addNewCar(30, "Premium", "VW", "Jetta", 2021, 80, 5, "medium", 9.4, 2.5, ["Manual Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/C1tgzJ6/JT-T.png", "https://i.ibb.co/6n77bRZ/jetta-1.jpg", "https://i.ibb.co/TB8V2s5/JT-4.jpg",
        "https://i.ibb.co/nRwk9JZ/JT-3.jpg", "https://i.ibb.co/sJJTbXW/JT-2.jpg", "https://ibb.co/SwFJd8C"
    ], "price_1L5fMyDNuL2bCfdELuCNHnPP" , "The Volkswagen Jetta places in the bottom half of our compact car rankings. The Jetta boasts a comfortable ride and a roomy cabin, but it isn't as engaging to drive or as upscale as many of its competitors.");
    addNewCar(30, "Premium", "Ford", "Mustang", 2020, 95, 4, "small", 9.5, 5, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/yhTcgW8/FM-T.png", "https://i.ibb.co/257HY1M/FM-I.png", "https://i.ibb.co/jk1VpQ1/FM-4.png",
        "https://i.ibb.co/b1VJYMR/FM-3.jpg", "https://i.ibb.co/pjQ7Z5C/FM-2.jpg", "https://i.ibb.co/2cSXBsy/FM-1.jpg"
    ], "price_1L5fMyDNuL2bCfdEbEgtDZGy", "The Ford Mustang finishes near the top of our sports car rankings. It’s fast and fun to drive, and it boasts a quality interior with easy-to-use tech features.");
    addNewCar(30, "Premium", "Mercedes", "C-180", 2021, 110, 5, "medium", 6.4, 2, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/n8tjxmJ/C180-T.png", "https://i.ibb.co/6sWR8yk/C180-1.jpg", "https://i.ibb.co/9rCsggw/C180-2.jpg",
        "https://i.ibb.co/JKgdF9T/C180-3.jpg", "https://i.ibb.co/35XZQqq/C180-I.png"
    ], "price_1L5fMyDNuL2bCfdE4rVEtX6U", "The Mercedes-Benz C-Class offers a strong engine lineup, a comfortable ride, and opulent cabin materials, but its rear seats are a bit short on space.");
    addNewCar(30, "Premium", "BMW", "320i", 2022, 110, 5, "medium", 7.3, 2, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/TTbGvvM/320-T.png", "https://i.ibb.co/7nhh0MF/320-I.jpg", "https://i.ibb.co/njzMwvk/320-4.png",
        "https://i.ibb.co/h20X2C4/320-3.jpg", "https://i.ibb.co/N9vJPKB/320-2.jpg", "https://i.ibb.co/h721YXF/320-1.jpg"
    ], "price_1L5fNrDNuL2bCfdEVsqoVLHl", "The engine of the BMW 320i Sedan is BMW's award-winning 2.0-liter TwinPower Turbo 4-cylinder engine, rated in the 320i at 180 horsepower");
    addNewCar(30, "Premium", "Audi", "A-4", 2022, 110, 5, "medium", 11.5, 2, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/m9cV9NR/A4-T.png", "https://i.ibb.co/vz84H9Q/A4-I.jpg", "https://i.ibb.co/3dTfpRt/A4-3.jpg",
        "https://i.ibb.co/wzGqg1N/A4-2.jpg", "https://i.ibb.co/SB84kp3/A4-1.jpg"
    ], "price_1L5fNrDNuL2bCfdEGndlIT97", "The Audi A4 is an appealing luxury small car, thanks in part to its balanced ride, potent yet efficient engines, and elegant cabin. It’s unranked in the class because it hasn’t been scored for predicted reliability.");
    addNewCar(30, "Pick-up", "Nissan", "Frontier", 2020, 130, 5, "large", 12.1, 2.5, ["Manual Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/RjhbfcD/NF-T-1.png", "https://i.ibb.co/xSFsxSp/FR-I.jpg", "https://i.ibb.co/TrqDPjs/FR-4.jpg",
        "https://i.ibb.co/3C72FSZ/FR-3.jpg", "https://i.ibb.co/Fg389Hn/FR-1.png",
    ], "price_1L5fNrDNuL2bCfdEl2i1VMYP", "The Nissan Frontier sees a full redesign that makes it more competitive in the compact pickup truck class. It has a well-built cabin with comfortable front seats, a smooth ride, and a fair amount of off-road capability.");
    addNewCar(30, "Pick-up", "Toyota", "Hilux", 2021, 130, 5, "large", 9.6, 2.8, ["Manual Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/3hBmtJg/HI-T.png", "https://i.ibb.co/NC9gZxV/HI-2.jpg", "https://i.ibb.co/bK4Mw5b/HI-I.jpg",
        "https://i.ibb.co/56X3mxD/HI-4.jpg", "https://i.ibb.co/9qf1V4V/HI-3.jpg", "https://i.ibb.co/sPB1G44/HI-1.jpg"
    ], "price_1L5fOVDNuL2bCfdEfsXtU7h1", "The strength of the Hilux lies in the vast volume of data Toyota has amassed in years of building reliable and rugged pickups. All models feature a laser-welded high-tensile steel body and chassis that has been subjected to exhaustive CAE simulation resulting in lightweight with excellent torsional rigidity for precise handling. ");
    addNewCar(30, "Pick-up", "Renault", "Alaskan", 2020, 130, 5, "large", 12.1, 2.5, ["Manual Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/Zxh8FMC/AK-T.png", "https://i.ibb.co/x3swNvY/AK-I.jpg", "https://i.ibb.co/tXHZfwJ/AK-3.jpg",
        "https://i.ibb.co/rdkpBm4/AK-2.jpg", "https://i.ibb.co/D4jXswb/AK-1.jpg"
    ], "price_1L5fOVDNuL2bCfdEjiH4pKBJ", "The Renault Alaskan is a car that is intended for continuous use, including jobs considered hard. For this reason, the passenger compartment is a simple space in which there is no danger of causing too much damage to expensive or exclusive materials.");
    addNewCar(30, "Pick-up", "VW", "Amarok", 2021, 130, 5, "large", 10.2, 2, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/9H61hhx/AM-T2.png", "https://i.ibb.co/hMK2bVz/AM-3.jpg", "https://i.ibb.co/gZWWNXz/AM-2.jpg",
        "https://i.ibb.co/gyFbpyL/AM-1.jpg"
    ], "price_1L5fOVDNuL2bCfdETPTSS3xx", "The Volkswagen Amarok is a pick-up from the manufacturer Volkswagen, one of its largest models. It is available only with TDI diesel engines up to 258 hp, as well as with different types of cabin to adapt to the needs of its clientele.");
    addNewCar(30, "Pick-up", "Ford", "Raptor", 2020, 150, 5, "large", 13.4, 3.5, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/LZbcNJB/FR-T-removebg-preview.png", "https://i.ibb.co/fnLj2zW/RP-I.jpg", "https://i.ibb.co/5MgXYMv/RP-4.jpg",
        "https://i.ibb.co/bs1ssKH/RP-3.jpg", "https://i.ibb.co/tzjScsF/RP-2.jpg", "https://i.ibb.co/w6bB9K2/RP-1.jpg"
    ], "price_1L5fPCDNuL2bCfdEHdrfQE3O", "Ford Raptor is equipped with Terrain Management, technology that offers the driver the choice between six Driving Modes to improve driving dynamics in a variety of environmental conditions including: Normal, Sport, Weather, Mud, Rock and Race in the Desert.");
    addNewCar(30, "Van", "Mercedes", "Sprinter", 2020, 350, 12, "large", 8.4, 3, ["Manual Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/CP2RJMP/MS-T.png", "https://i.ibb.co/jTXNRHD/MS-I.jpg", "https://i.ibb.co/MhSYpJ6/MS-3.jpg",
        "https://i.ibb.co/TgD01nJ/MS-2.jpg"
    ], "price_1L5fPCDNuL2bCfdEVAA8XmWu", "The Mercedes-Benz Sprinter is a light commercial vehicle, built by Daimler AG of Düsseldorf, Germany, as a panel van, minibus, flatbed and chassis.");
    addNewCar(30, "Van", "Dodge", "Grand caravan", 2021, 150, 7, "large", 14.1, 3.6, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/JFsWpzG/DC-T-removebg-preview.png", "https://i.ibb.co/3WhB0Gb/DC-I.jpg", "https://i.ibb.co/gzHpqhR/DC-2.jpg",
        "https://i.ibb.co/GH9DtRc/DC-1.jpg", "https://i.ibb.co/khsGMyL/DC-3.jpg"
    ], "price_1L5fPCDNuL2bCfdEjCpgglXW", "Tiene capacidad para transportar cómodamente 7 pasajeros. Inclusive se proporciona sistema de video y entretenimiento para la 2ª fila de asientos lo cual resulta conveniente para los viajes largos y se transporta una joven familia con hijos pequeños.");
    addNewCar(30, "Van", "Renault", "Trafic", 2020, 250, 12, "large", 7.3, 1.6, ["Manual Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/WF6ZKMr/RT-T-removebg-preview.png", "https://i.ibb.co/0F7vqhy/RT-I.jpg", "https://i.ibb.co/mCPQZJW/RT-1.jpg",
        "https://i.ibb.co/mcZVbn2/RT-2.jpg", "https://i.ibb.co/sjb1Zzy/RT-3.jpg"
    ], "price_1L5fPtDNuL2bCfdE4pnZJids", "The Renault Trafic is a van that only has diesel engines of the dCi type. All engines are 1.6 liters.");
    addNewCar(30, "Van", "Honda", "Odyssey", 2021, 180, 7, "large", 10.2, 3.6, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/m5k63L3/OD-T-removebg-preview.png", "https://i.ibb.co/nj01Y4m/OD-I.jpg", "https://i.ibb.co/6BT639s/OD-3.jpg",
        "https://i.ibb.co/Y25c2Vc/OD-2.jpg", "https://i.ibb.co/DC3x1cz/OD-1.jpg"
    ], "price_1L5fPtDNuL2bCfdEJ9dh2fsy", "The Odyssey keeps its 3.5-liter V6 engine, which makes 280 hp and 262 lb-ft and is controlled by a 10-speed automatic transmission.");
    addNewCar(30, "Hybrid", "Toyota", "Rav 4", 2022, 150, 5, "large", 3.5, 2.5, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/gT7k316/RAV-T.png", "https://i.ibb.co/k9x8Xwr/RAV-I.jpg", "https://i.ibb.co/bj4320d/RAV-4.jpg",
        "https://i.ibb.co/tPm86zN/RAV-3.png", "https://i.ibb.co/RTZVhWn/RAV-2.jpg", "https://i.ibb.co/NWQC3HG/RAV-1.jpg"
    ], "price_1L5fPtDNuL2bCfdEYi0i9scw", "The Toyota RAV4 is a compact SUV that has been marketed in its fifth generation since December 2018. We are talking about one of the forerunners of the SUV concept.");
    addNewCar(30, "Hybrid", "Kia", "Niro", 2022, 150, 5, "large", 4.4, 1.6, ["Manual Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/yFpHgWg/KN-T-removebg-preview.png", "https://i.ibb.co/k9x8Xwr/RAV-I.jpg", "https://i.ibb.co/bj4320d/RAV-4.jpg",
        "https://i.ibb.co/tPm86zN/RAV-3.png", "https://i.ibb.co/RTZVhWn/RAV-2.jpg", "https://i.ibb.co/NWQC3HG/RAV-1.jpg"
    ], "price_1L5fQTDNuL2bCfdEH5FRs5CQ", "The Kia Niro is characterized by being offered only with electrified mechanics: non-plug-in conventional hybrid, plug-in hybrid and 100% electric.");
    addNewCar(30, "Hybrid", "Toyota", "Corolla", 2020, 120, 5, "medium", 4.5, 1.6, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/18C1PXJ/TC-T.png", "https://i.ibb.co/n6RnHPQ/TC-I.jpg", "https://i.ibb.co/g77365y/TC-4.jpg",
        "https://i.ibb.co/445MDmc/TC-3.jpg", "https://i.ibb.co/ZdxMKjF/TC-2.jpg", "https://i.ibb.co/k8crWRy/TC-1.jpg"
    ], "price_1L5fQTDNuL2bCfdET3jNAsKQ", "The Toyota Corolla boasts great fuel economy, pleasant driving dynamics, user-friendly features, and many standard driver assistance features, but its engine performance is restrained, and it has a small trunk.");
    addNewCar(30, "Hybrid", "Suzuki", "Swift", 2020, 80, 5, "small", 3.8, 1.2, ["Manual Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/vLsLCQf/SZ-T.png", "https://i.ibb.co/KVSx2SW/SZ-I.jpg", "https://i.ibb.co/SKTyyXb/SZ-4.jpg",
        "https://i.ibb.co/9gC2bQY/SZ-3.jpg", "https://i.ibb.co/YtBn8ph/SZ-2.jpg", "https://i.ibb.co/Fq0L5DH/SZ-1.jpg"
    ], "price_1L5fQTDNuL2bCfdER7ScxQ8K", "The Suzuki Swift is one of the most dynamic utility vehicles in its segment. Thanks to a very well tuned and, above all, very light platform, the engine performs very satisfactorily.");
    addNewCar(30, "SUV Full-Size", "Toyota", "4 Runner", 2021, 130, 7, "large", 12.5, 4, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/XZfRwDY/4R-T.png", "https://i.ibb.co/vv86D4D/4R-1.jpg", "https://i.ibb.co/NV8rxMx/4R-3.png",
        "https://i.ibb.co/80Wy9wh/4R-2.jpg", "https://i.ibb.co/s2h60Mm/4R-I.png"
    ], "price_1L5fRCDNuL2bCfdEKO7dYhhC", "The Toyota 4Runner finishes near the bottom of our midsize SUV rankings. It’s great for off-roading and has a spacious cabin, but it’s not as upscale, comfortable, or modern as most competitors.");
    addNewCar(30, "SUV Full-Size", "Nissan", "Patrol", 2022, 180, 7, "large", 14.5, 5.6, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/bB0Vcfv/NP-T-removebg-preview.png", "https://i.ibb.co/GFvLFmf/NP-I.jpg", "https://i.ibb.co/J5Kczzy/NP-4.jpg",
        "https://i.ibb.co/Gt74XXF/NP-3.jpg", "https://i.ibb.co/ckCVMm3/NP-2.jpg", "https://i.ibb.co/9cn7M9Z/NP-1.png"
    ], "price_1L5fRCDNuL2bCfdEx3TaLqyS", "Its 4x4 drive with Limited Slip Differential will take you to the highest.");
    addNewCar(30, "SUV Full-Size", "Lexus", "GX 460", 2021, 200, 7, "large", 15.2, 4.6, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/hFpWXh1/LG-T1.png", "https://i.ibb.co/80YmQ06/LG-4.jpg", "https://i.ibb.co/GC1KDwp/LG-3.jpg",
        "https://i.ibb.co/myDtrHY/LG-1.jpg", "https://i.ibb.co/zJvW1Pt/LG-I.jpg"
    ], "price_1L5fRCDNuL2bCfdEtGdAexKC", "The Lexus GX is an admirable off-roader, and it's fairly comfortable inside, but its on-road manners are brash. This vehicle does not have an overall score or ranking because it hasn't been fully crash tested.");
    addNewCar(30, "SUV Full-Size", "Ford", "Explorer", 2021, 140, 5, "large", 8.4, 3, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/nR2frj8/FE-T-removebg-preview-1.png", "https://i.ibb.co/sjgwQLp/FI-I.jpg", "https://i.ibb.co/NTg2yvD/FE-I.jpg",
        "https://i.ibb.co/kHDX3Lm/FE-3.jpg", "https://i.ibb.co/qRXZXy5/FE-2.jpg", "https://i.ibb.co/bJnhwKg/FE-1.jpg"
    ], "price_1L5fS0DNuL2bCfdEpMVmRSAW", "The Ford Explorer finishes in the bottom third of our midsize SUV rankings. It's powerful and it offers a comfortable ride, but it doesn’t match the interior quality of many competitors.");
    addNewCar(30, "SUV Full-Size", "Jeep", "Rubicon", 2020, 150, 5, "large", 9.6, 3.6, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/1ntzFkY/JR-T.png", "https://i.ibb.co/bH796z8/JR-I.jpg", "https://i.ibb.co/PzG5H2R/JR-4.jpg",
        "https://i.ibb.co/pXDhN1Z/JR-3.jpg", "https://i.ibb.co/DKc8qkV/JR-2.jpg", "https://i.ibb.co/TK6ynys/JR-1.jpg"
    ], "price_1L5fS0DNuL2bCfdElUhey8ou", "Delivers a combined 374 hp of power, combining the 270 hp turbo gasoline engine and an electrical system with two motors / alternators on both axles.");
    addNewCar(30, "SUV", "Nissan", "Murano", 2022, 95, 5, "large", 11.2, 3.5, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/zPd5Sj4/NM-T-removebg-preview.png", "https://i.ibb.co/XFm1Jmw/NM-I.jpg", "https://i.ibb.co/f1pGBtx/NM-3.jpg",
        "https://i.ibb.co/7WqHyKR/NM-2.png", "https://i.ibb.co/k1tpQ73/NM-1.jpg"
    ], "price_1L5fS0DNuL2bCfdECORMaEA7", "The Nissan Murano provides a comfortable ride and a powerful engine, but it sits in the bottom half of the midsize SUV class in part because it’s not as athletic as rivals, and it falters when it comes to cargo space.");
    addNewCar(30, "SUV", "Mazda", "CX-9", 2022, 95, 5, "large", 11.2, 2.5, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/wpd0Z3C/MC-T.png", "https://i.ibb.co/xgb9MMs/MC-I.jpg", "https://i.ibb.co/ZBQjPYy/MC-3.jpg",
        "https://i.ibb.co/ZN3xmN8/MC-2.jpg", "https://i.ibb.co/BNdPyj5/MC-1.jpg", "https://i.ibb.co/h9XbLNh/MC-4.jpg"
    ], "price_1L5fSdDNuL2bCfdEouitfqhs", "The Mazda CX-9 lands near the top of the midsize SUV class thanks in part to its dynamic performance and handling, along with its high-class cabin.");
    addNewCar(30, "SUV", "Chevrolet", "Blazer RS", 2021, 115, 5, "large", 15, 3.6, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/g3rYwmH/CB-T-removebg-preview.png", "https://i.ibb.co/KszfSQQ/CB-I.jpg", "https://i.ibb.co/hX1k5mz/CB-4.jpg",
        "https://i.ibb.co/rHdbL87/CB-3.jpg", "https://i.ibb.co/4dznLk1/CB-2.jpg", "https://i.ibb.co/r0J9j51/CB-1.jpg"
    ], "price_1L5fSdDNuL2bCfdE7j7kIxUj", "The Chevrolet Blazer ranks near the back of the midsize SUV class. The Blazer has strong engine performance, composed handling, and a user-friendly touch screen, but it also has cumbersome ergonomics, an undersized cargo area, and a firm ride.");
    addNewCar(30, "SUV", "Dodge", "Durango GT", 2020, 145, 7, "large", 10.4, 3.6, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/hZwbb53/DD-T-removebg-preview-1-1.png", "https://i.ibb.co/m5cRtd4/DD-I-1.jpg", "https://i.ibb.co/C8c6V6r/DD-3-1.jpg",
        "https://i.ibb.co/mHSFcGL/DD-1-1.jpg", "https://i.ibb.co/qxBY2Vq/DD-2-1.jpg"
    ], "price_1L5fSdDNuL2bCfdELZ2jLRoI", "The Dodge Durango offers stout engine performance, a spacious three-row interior, and intuitive tech features, but it also has rigid handling and lackluster fuel economy.");

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
        rating: 3,
        location: "Córdoba"
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
        rating: 4,
        location: "Córdoba"
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