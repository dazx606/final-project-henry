import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import CarCard from "../../components/CarCard/CarCard";
import CarFilters from "../../components/CarFilters/CarFilters";
import LocationFilter from "../../components/LocationFilter/LocationFilter";
import { getFilteredCars } from "../../redux/actions";

import styles from "./CarsSelection.module.css";

function CarsSelection() {
  const locations = useSelector((state) => state.locations);
  const filteredCars = useSelector((state) => state.filteredCars);
  const dispatch = useDispatch();
  const { locationId } = useParams();
  const [selection, setSelection] = useState({
    orderType: "pricePerDay",
    order: "ASC",
    startDate: "",
    endDate: "",
    carType: "", //category
    brand: "",
    page: 0
  });

  useEffect(() => {
    dispatch(getFilteredCars(selection, locationId));
  }, [dispatch, locationId, selection])


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
      <div className={styles.cardsScreen}>
        {
          filteredCars && filteredCars.map((car) => {
            return (
              <div  key={car.license_plate}>
                <CarCard carId={car.license_plate} brand={car.brand} model={car.model} pricePerDay={car.pricePerDay} rating={car.rating}
                  image={car.images[0]} />
              </div>

            )
          })
        }

      </div>
    </div>
  );
}

export default CarsSelection;
