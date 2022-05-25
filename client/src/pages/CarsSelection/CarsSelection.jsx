import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CarFilters from "../../components/CarFilters/CarFilters";
import LocationFilter from "../../components/LocationFilter/LocationFilter";

import styles from "./CarsSelection.module.css";

function CarsSelection() {
  const locations = useSelector((state) => state.locations);
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
    </div>
  );
}

export default CarsSelection;
