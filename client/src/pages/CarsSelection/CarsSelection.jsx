import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import CarCard from "../../components/CarCard/CarCard";
import CarFilters from "../../components/CarFilters/CarFilters";
import LocationFilter from "../../components/LocationFilter/LocationFilter";
import Pagination from "../../components/Pagination/Pagination";
import { getFilteredCars, setCity, setSelection } from "../../redux/actions";

import styles from "./CarsSelection.module.css";

const datePlus = (date, num) => {
  return new Date(new Date(date.getTime()).setDate(new Date(date.getTime()).getDate() + num));
}

const toUglyDayFormat = (date) => {
  return new Date(date.getTime() - (date.getTimezoneOffset() * 60 * 1000)).toISOString().split('T')[0];
}

function CarsSelection() {
  const locations = useSelector((state) => state.locations);
  const filteredCars = useSelector((state) => state.filteredCars);
  const dispatch = useDispatch();
  const { locationId } = useParams();
  const selection = useSelector((state) => state.selection);

  useEffect(() => {
    dispatch(getFilteredCars(selection, locationId));
  }, [dispatch, locationId, selection]);

  const findCityName = (array) => {
    if (locations.length) {
      const location = array.find(
        (element) => element.id === parseInt(locationId)
      );
      return location.city;
    }
  };
  const handleFilters = (e) => {
    let value = e.target.value;
    let endingLowerThanStarting = false;
    if (e.target.name === "startingDate" || e.target.name === "endingDate") {
      value = value.split("-").join("/");
      if (e.target.name === "startingDate" && new Date(value) >= new Date(selection.endingDate)) {
        endingLowerThanStarting = true;
      }
    }
    let selected = { ...selection, [e.target.name]: value, page: 1 };
    if (endingLowerThanStarting) selected.endingDate = toUglyDayFormat(datePlus(new Date(value), 1)).split("-").join("/");
    dispatch(setSelection(selected));
    dispatch(getFilteredCars(selected, locationId));
  };

  const handlePages = (page) => {
    dispatch(getFilteredCars({
      ...selection,
      page
    }, locationId))
  }

  return (
    <div>
      <div>
        <div className={styles.title}>{findCityName(locations)}</div>
        <div className={styles.selections}>
          <div className={styles.locSelections}>
            <LocationFilter />
          </div>
          <CarFilters
            locationId={locationId}
            selection={selection}
            handleFilters={handleFilters}
          />
        </div>
      </div>
      <div className={styles.cardsScreen}>
        {filteredCars.length ? (
          filteredCars.map((car) => {
            return (
              <CarCard
                key={car.model}
                brand={car.brand}
                model={car.model}
                pricePerDay={car.pricePerDay}
                rating={car.rating}
                image={car.images[0]}
              />
            );
          })
        ) : (
          <div className={styles.warningContainer}>
            <div className={styles.warningImg}>
              {/* <img className={styles.warning} src="https://icon-library.com/images/error-image-icon/error-image-icon-3.jpg" alt='not found' /> */}
              <i className={`fa-solid fa-car ${styles.warningIcon}`}></i>
            </div>
            <div className={styles.warningText}>
              <p className={styles.warning2}>{`We are sorry!`}</p>
              <p className={styles.warning2}>No cars found</p>
            </div>
          </div>
        )}
      </div>
      {
        filteredCars.length ? <Pagination handlePages={handlePages} /> : null
      }
    </div>
  );
}

export default CarsSelection;
