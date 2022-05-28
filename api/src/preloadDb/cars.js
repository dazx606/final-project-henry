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

    let  j = 0;
    allCars = [];
    const addNewCar = (amount, carType, brand, model, year, pricePerDay, passengers, trunk, consumption, engine, includedEquipment, opcionalEquipment, images) => {
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
            })
        }
    }
    //---------------------el array de imagenes recibe [imagenTarjeta, imagenImponente, etc...]--------------------
    addNewCar(10, "Luxury", "Porsche", "Carrera 911", 2021, 600, 2, "small", 9.3, 3, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS"], [
        "https://i.ibb.co/W3jxZjQ/911-T2.png", "https://i.ibb.co/80ycS4G/911-I.png", "https://i.ibb.co/sKyJFjm/911-5.jpg",
        "https://i.ibb.co/Ypd5Ndb/911-4.jpg", "https://i.ibb.co/9VcqyVb/911-3.jpg", "https://i.ibb.co/F3K31rM/911-2.png",
        "https://i.ibb.co/Wf5H2qg/911-1.png"
    ]);
    addNewCar(10, "Luxury", "Nissan", "GTR", 2020, 550, 4, "small", 14.3, 3.8, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS"], [
        "https://i.ibb.co/0JpLG43/GTR-T.png", "https://i.ibb.co/ysqvh8n/GTR-I.jpg", "https://i.ibb.co/BVQHLBb/GTR-2.jpg",
        "https://i.ibb.co/gzpW2Gv/GTR-1.jpg"
    ]);
    addNewCar(12, "Luxury", "Mercedes", "A-45", 2020, 380, 4, "small", 6.9, 2, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS"], [
        "https://i.ibb.co/JvqGLhZ/A45-T.png", "https://i.ibb.co/zPYw4sp/A45-I.jpg", "https://i.ibb.co/gZpkyrM/A45-4.jpg",
        "https://i.ibb.co/gtfT5pG/A45-3.jpg", "https://i.ibb.co/r0z6pZy/A45-2.jpg"
    ]);
    addNewCar(12, "Luxury", "BMW", "M4", 2022, 380, 4, "small", 10.4, 3, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS"], [
        "https://i.ibb.co/YRQF0X4/M4-T.png", "https://i.ibb.co/6RnT5HT/M4-I.png", "https://i.ibb.co/5vTVBBv/M4-3.jpg",
        "https://i.ibb.co/RT6ZqHR/M4-2.jpg", "https://i.ibb.co/0Mbs49T/M4-1.jpg"
    ]);
    addNewCar(12, "Luxury", "Audi", "RS 3", 2021, 380, 4, "small", 11.3, 2.5, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS"], [
        "https://i.ibb.co/TWw9bbq/RS-T.png", "https://i.ibb.co/wKF9Tfp/RS-I.jpg", "https://i.ibb.co/CKVgZg7/RS-1.jpg",
        "https://i.ibb.co/jRHMJ44/RS-2.jpg", "https://i.ibb.co/sVTVhNY/RS-3.png"
    ]);
    addNewCar(30, "Premium", "Mazda", "6", 2020, 80, 5, "medium", 6.2, 2, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/Swspsq7/MZD6-T.png", "https://i.ibb.co/C15xMBD/MZD6-I.jpg", "https://i.ibb.co/StKL6ky/MZD-4.jpg",
        "https://i.ibb.co/0Yc5L3z/MZD-3.jpg", "https://i.ibb.co/xmph3Hr/MZD-2.jpg", "https://i.ibb.co/JCktHPY/MZD-1.jpg"
    ]);
    addNewCar(30, "Premium", "Ford", "Fusion", 2020, 80, 5, "medium", 12.2, 2, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/Xk2N0S8/FS-T-1.png", "https://i.ibb.co/fqjMFsf/Fusion-I.jpg", "https://i.ibb.co/kBKWn2L/Fusion-3.jpg",
        "https://i.ibb.co/HH57n2G/Fusion-2.jpg", "https://i.ibb.co/zP3BN7F/Fusion-1.jpg", ""
    ]);
    addNewCar(30, "Premium", "VW", "Jetta", 2021, 80, 5, "medium", 9.4, 2.5, ["Manual Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/rvHRfN2/JT-T.png", "https://i.ibb.co/r5MV4XT/JT-I.jpg", "https://i.ibb.co/TB8V2s5/JT-4.jpg",
        "https://i.ibb.co/nRwk9JZ/JT-3.jpg", "https://i.ibb.co/sJJTbXW/JT-2.jpg", "https://ibb.co/SwFJd8C"
    ]);
    addNewCar(30, "Premium", "Ford", "Mustang", 2020, 95, 4, "small", 9.5, 5, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/VTrfst2/FM-T.png", "https://i.ibb.co/257HY1M/FM-I.png", "https://i.ibb.co/jk1VpQ1/FM-4.png",
        "https://i.ibb.co/b1VJYMR/FM-3.jpg", "https://i.ibb.co/pjQ7Z5C/FM-2.jpg", "https://i.ibb.co/2cSXBsy/FM-1.jpg"
    ]);
    addNewCar(30, "Premium", "Mercedes", "C-180", 2021, 110, 5, "medium", 6.4, 2, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/k8gBdBL/C180-T.png", "https://i.ibb.co/6sWR8yk/C180-1.jpg", "https://i.ibb.co/9rCsggw/C180-2.jpg",
        "https://i.ibb.co/JKgdF9T/C180-3.jpg", "https://i.ibb.co/35XZQqq/C180-I.png"
    ]);
    addNewCar(30, "Premium", "BMW", "320i", 2022, 110, 5, "medium", 7.3, 2, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/NFLKv5C/320-T.png", "https://i.ibb.co/7nhh0MF/320-I.jpg", "https://i.ibb.co/njzMwvk/320-4.png",
        "https://i.ibb.co/h20X2C4/320-3.jpg", "https://i.ibb.co/N9vJPKB/320-2.jpg", "https://i.ibb.co/h721YXF/320-1.jpg"
    ]);
    addNewCar(30, "Premium", "Audi", "A-4", 2022, 110, 5, "medium", 11.5, 2, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/6m1jqKS/A4-T.jpg", "https://i.ibb.co/vz84H9Q/A4-I.jpg", "https://i.ibb.co/3dTfpRt/A4-3.jpg",
        "https://i.ibb.co/wzGqg1N/A4-2.jpg", "https://i.ibb.co/SB84kp3/A4-1.jpg"
    ]);
    addNewCar(30, "Pick-up", "Nissan", "Frontier", 2020, 130, 5, "large", 12.1, 2.5, ["Manual Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/whQg7NH/FR-T.png", "https://i.ibb.co/xSFsxSp/FR-I.jpg", "https://i.ibb.co/TrqDPjs/FR-4.jpg",
        "https://i.ibb.co/3C72FSZ/FR-3.jpg", "https://i.ibb.co/Fg389Hn/FR-1.png",
    ]);
    addNewCar(30, "Pick-up", "Toyota", "Hilux", 2021, 130, 5, "large", 9.6, 2.8, ["Manual Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/3cgtGjQ/HI-T.png", "https://i.ibb.co/NC9gZxV/HI-2.jpg", "https://i.ibb.co/bK4Mw5b/HI-I.jpg",
        "https://i.ibb.co/56X3mxD/HI-4.jpg", "https://i.ibb.co/9qf1V4V/HI-3.jpg", "https://i.ibb.co/sPB1G44/HI-1.jpg"
    ]);
    addNewCar(30, "Pick-up", "Renault", "Alaskan", 2020, 130, 5, "large", 12.1, 2.5, ["Manual Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/kMzhkRv/AK-T.png", "https://i.ibb.co/x3swNvY/AK-I.jpg", "https://i.ibb.co/tXHZfwJ/AK-3.jpg",
        "https://i.ibb.co/rdkpBm4/AK-2.jpg", "https://i.ibb.co/D4jXswb/AK-1.jpg"
    ]);
    addNewCar(30, "Pick-up", "VW", "Amarok", 2021, 130, 5, "large", 10.2, 2, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/dj6XMW9/AM-T.jpg", "https://i.ibb.co/hMK2bVz/AM-3.jpg", "https://i.ibb.co/gZWWNXz/AM-2.jpg",
        "https://i.ibb.co/gyFbpyL/AM-1.jpg"
    ]);
    addNewCar(30, "Pick-up", "Ford", "Raptor", 2020, 150, 5, "large", 13.4, 3.5, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/Yks7psM/FR-T.jpg", "https://i.ibb.co/fnLj2zW/RP-I.jpg", "https://i.ibb.co/5MgXYMv/RP-4.jpg",
        "https://i.ibb.co/bs1ssKH/RP-3.jpg", "https://i.ibb.co/tzjScsF/RP-2.jpg", "https://i.ibb.co/w6bB9K2/RP-1.jpg"
    ]);
    addNewCar(30, "Van", "Mercedes", "Sprinter", 2020, 350, 12, "large", 8.4, 3, ["Manual Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/0G9W2pF/MS-T.png", "https://i.ibb.co/jTXNRHD/MS-I.jpg", "https://i.ibb.co/MhSYpJ6/MS-3.jpg",
        "https://i.ibb.co/TgD01nJ/MS-2.jpg"
    ]);
    addNewCar(30, "Van", "Dodge", "Grand caravan", 2021, 150, 7, "large", 14.1, 3.6, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/zPrCqk3/DC-T.jpg", "https://i.ibb.co/3WhB0Gb/DC-I.jpg", "https://i.ibb.co/gzHpqhR/DC-2.jpg",
        "https://i.ibb.co/GH9DtRc/DC-1.jpg", "https://i.ibb.co/khsGMyL/DC-3.jpg"
    ]);
    addNewCar(30, "Van", "Renault", "Trafic", 2020, 250, 12, "large", 7.3, 1.6, ["Manual Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/8m2BKRz/RT-T.jpg", "https://i.ibb.co/0F7vqhy/RT-I.jpg", "https://i.ibb.co/mCPQZJW/RT-1.jpg",
        "https://i.ibb.co/mcZVbn2/RT-2.jpg", "https://i.ibb.co/sjb1Zzy/RT-3.jpg"
    ]);
    addNewCar(30, "Van", "Honda", "Odyssey", 2021, 180, 7, "large", 10.2, 3.6, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/3YJ28wr/OD-T.jpg", "https://i.ibb.co/nj01Y4m/OD-I.jpg", "https://i.ibb.co/6BT639s/OD-3.jpg",
        "https://i.ibb.co/Y25c2Vc/OD-2.jpg", "https://i.ibb.co/DC3x1cz/OD-1.jpg"
    ]);
    addNewCar(30, "Hybrid", "Toyota", "Rav 4", 2022, 150, 5, "large", 3.5, 2.5, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/Lxzr5KZ/RAV-T.png", "https://i.ibb.co/k9x8Xwr/RAV-I.jpg", "https://i.ibb.co/bj4320d/RAV-4.jpg",
        "https://i.ibb.co/tPm86zN/RAV-3.png", "https://i.ibb.co/RTZVhWn/RAV-2.jpg", "https://i.ibb.co/NWQC3HG/RAV-1.jpg"
    ]);
    addNewCar(30, "Hybrid", "Kia", "Niro", 2022, 150, 5, "large", 4.4, 1.6, ["Manual Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/Lxzr5KZ/RAV-T.png", "https://i.ibb.co/k9x8Xwr/RAV-I.jpg", "https://i.ibb.co/bj4320d/RAV-4.jpg",
        "https://i.ibb.co/tPm86zN/RAV-3.png", "https://i.ibb.co/RTZVhWn/RAV-2.jpg", "https://i.ibb.co/NWQC3HG/RAV-1.jpg"
    ]);
    addNewCar(30, "Hybrid", "Toyota", "Corolla", 2020, 120, 5, "medium", 4.5, 1.6, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/1qvFDVf/TC-T.png", "https://i.ibb.co/n6RnHPQ/TC-I.jpg", "https://i.ibb.co/g77365y/TC-4.jpg",
        "https://i.ibb.co/445MDmc/TC-3.jpg", "https://i.ibb.co/ZdxMKjF/TC-2.jpg", "https://i.ibb.co/k8crWRy/TC-1.jpg"
    ]);
    addNewCar(30, "Hybrid", "Suzuki", "Swift", 2020, 80, 5, "small", 3.8, 1.2, ["Manual Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/CKxcGzY/SZ-T.png", "https://i.ibb.co/KVSx2SW/SZ-I.jpg", "https://i.ibb.co/SKTyyXb/SZ-4.jpg",
        "https://i.ibb.co/9gC2bQY/SZ-3.jpg", "https://i.ibb.co/YtBn8ph/SZ-2.jpg", "https://i.ibb.co/Fq0L5DH/SZ-1.jpg"
    ]);
    addNewCar(30, "SUV Full-Size", "Toyota", "4 Runner", 2021, 130, 7, "large", 12.5, 4, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/rvPYhvw/4R-T.png", "https://i.ibb.co/vv86D4D/4R-1.jpg", "https://i.ibb.co/NV8rxMx/4R-3.png",
        "https://i.ibb.co/80Wy9wh/4R-2.jpg", "https://i.ibb.co/s2h60Mm/4R-I.png"
    ]);
    addNewCar(30, "SUV Full-Size", "Nissan", "Patrol", 2022, 180, 7, "large", 14.5, 5.6, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/JtpgMZB/NP-T.png", "https://i.ibb.co/GFvLFmf/NP-I.jpg", "https://i.ibb.co/J5Kczzy/NP-4.jpg",
        "https://i.ibb.co/Gt74XXF/NP-3.jpg", "https://i.ibb.co/ckCVMm3/NP-2.jpg", "https://i.ibb.co/9cn7M9Z/NP-1.png"
    ]);
    addNewCar(30, "SUV Full-Size", "Lexus", "GX 460", 2021, 200, 7, "large", 15.2, 4.6, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/7KMTQNQ/LG-T1.png", "https://i.ibb.co/80YmQ06/LG-4.jpg", "https://i.ibb.co/GC1KDwp/LG-3.jpg",
        "https://i.ibb.co/myDtrHY/LG-1.jpg", "https://i.ibb.co/zJvW1Pt/LG-I.jpg"
    ]);
    addNewCar(30, "SUV Full-Size", "Ford", "Explorer", 2021, 140, 5, "large", 8.4, 3, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/2d9n3p0/FE-T-2.webp", "https://i.ibb.co/sjgwQLp/FI-I.jpg", "https://i.ibb.co/NTg2yvD/FE-I.jpg",
        "https://i.ibb.co/kHDX3Lm/FE-3.jpg", "https://i.ibb.co/qRXZXy5/FE-2.jpg", "https://i.ibb.co/bJnhwKg/FE-1.jpg"
    ]);
    addNewCar(30, "SUV Full-Size", "Jeep", "Rubicon", 2020, 150, 5, "large", 9.6, 3.6, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/MB7tYMq/JR-T.png", "https://i.ibb.co/bH796z8/JR-I.jpg", "https://i.ibb.co/PzG5H2R/JR-4.jpg",
        "https://i.ibb.co/pXDhN1Z/JR-3.jpg", "https://i.ibb.co/DKc8qkV/JR-2.jpg", "https://i.ibb.co/TK6ynys/JR-1.jpg"
    ]);
    addNewCar(30, "SUV", "Nissan", "Murano", 2022, 95, 5, "large", 11.2, 3.5, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/bPJQFvJ/NM-T.png", "https://i.ibb.co/XFm1Jmw/NM-I.jpg", "https://i.ibb.co/f1pGBtx/NM-3.jpg",
        "https://i.ibb.co/7WqHyKR/NM-2.png", "https://i.ibb.co/k1tpQ73/NM-1.jpg"
    ]);
    addNewCar(30, "SUV", "Mazda", "CX-9", 2022, 95, 5, "large", 11.2, 2.5, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/GnSWz1t/MC-T.jpg", "https://i.ibb.co/xgb9MMs/MC-I.jpg", "https://i.ibb.co/ZBQjPYy/MC-3.jpg",
        "https://i.ibb.co/ZN3xmN8/MC-2.jpg", "https://i.ibb.co/BNdPyj5/MC-1.jpg", "https://i.ibb.co/h9XbLNh/MC-4.jpg"
    ]);
    addNewCar(30, "SUV", "Chevrolet", "Blazer RS", 2021, 115, 5, "large", 15, 3.6, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/xSTW54C/CB-T.jpg", "https://i.ibb.co/KszfSQQ/CB-I.jpg", "https://i.ibb.co/hX1k5mz/CB-4.jpg",
        "https://i.ibb.co/rHdbL87/CB-3.jpg", "https://i.ibb.co/4dznLk1/CB-2.jpg", "https://i.ibb.co/r0J9j51/CB-1.jpg"
    ]);
    addNewCar(30, "SUV", "Dodge", "Durango GT", 2020, 145, 7, "large", 10.4, 3.6, ["Automatic Transmission", "Radio", "Airconditioning", "Electric Windows", "Bluetooth", "Power steering"], ["GPS", "Child seat", "Baby seat"], [
        "https://i.ibb.co/YBKByyY/DD-T-1.webp", "https://i.ibb.co/m5cRtd4/DD-I-1.jpg", "https://i.ibb.co/C8c6V6r/DD-3-1.jpg",
        "https://i.ibb.co/mHSFcGL/DD-1-1.jpg", "https://i.ibb.co/qxBY2Vq/DD-2-1.jpg"
    ]);

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