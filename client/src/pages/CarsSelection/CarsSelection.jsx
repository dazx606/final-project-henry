import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CarCard from "../../components/CarCard/CarCard";
import CarFilters from "../../components/CarFilters/CarFilters";
import LocationFilter from "../../components/LocationFilter/LocationFilter";

import styles from "./CarsSelection.module.css";

function CarsSelection() {
  const locations = useSelector((state) => state.locations);
  // hardcoding some car
  const car =  {
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
    ratingNum: 0,
    carTypeId: 2,
    locationId: 3,
    carType: {
        id: 2,
        name: "Luxury"
    },
    location: {
        id: 3,
        city: "Córdoba",
        latitude: -31.31,
        longitude: -64.208333
    }
}
  const { locationId } = useParams();
  const [selection, setSelection] = useState({
    orderType: "pricePerDay",
    order: "ASC",
    date: "",
    carType: "", //category
    brand: "",
  });

  const findCityName = (array) => {
    if (locations.length) {
      const location = array.find(
        (element) => element.id === parseInt(locationId)
      );
      return location.city;
    }
  };

  return (
    <div>
      <div>
        <div className={styles.title}>{findCityName(locations)}</div>
        <div className={styles.selections}>
          <LocationFilter />
          <CarFilters
            locationId={locationId}
            selection={selection}
            setSelection={setSelection}
          />
        </div>
      </div>
      <div>
        <CarCard carId={car.license_plate} brand={car.brand} model={car.model} pricePerDay={car.pricePerDay} rating={car.rating} 
        image={'https://medias.fcacanada.ca/jellies/renditions/2022/800x510/CC22_WDEL75_2TB_PW7_APA_XXX_XXX_XXX.39b8b4c917c321aef46dc539d4d6bd9d.png'}  />
      </div>
    </div>
  );
}

export default CarsSelection;
