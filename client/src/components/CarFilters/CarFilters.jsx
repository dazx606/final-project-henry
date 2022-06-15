import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocationCars } from "../../redux/actions";

import styles from "./CarFilters.module.css";

const toUglyDayFormat = (date) => {
  return new Date(date.getTime() - (date.getTimezoneOffset() * 60 * 1000)).toISOString().split('T')[0];
}

const datePlus = (date, num) => {
  return new Date(new Date(date.getTime()).setDate(new Date(date.getTime()).getDate() + num));
}

function CarFilters({ locationId, selection, handleFilters }) {
  const dispatch = useDispatch();
  const locationCars = useSelector((state) => state.locationCars);
  const city = useSelector((state) => state.city)

  useEffect(() => {
    if (!locationId) {
      locationId = city;
    }
    dispatch(getLocationCars(locationId));
  }, [dispatch, locationId]);

  return (
    <div className={styles.filters}>
      <div className={styles.section}>
        <span>From:</span>
        <input
          type="date"
          name="startingDate"
          value={selection.startingDate.split("/").join("-")}
          className={`inputGlobal ${styles.date} ${styles.datefirst}`}
          onChange={(e) => handleFilters(e)}
          min={toUglyDayFormat(new Date())}
        />
        <span >to:</span>
        <input
          type="date"
          name="endingDate"
          value={selection.endingDate.split("/").join("-")}
          className={`inputGlobal ${styles.date}`}
          onChange={(e) => handleFilters(e)}
          min={toUglyDayFormat(!selection.startingDate ? datePlus(new Date(), 1) : datePlus(new Date(selection.startingDate), 1))}
        />
      </div>
      {/* <div className={styles.section}>

      </div> */}
      <div className={styles.section}>
        <span>Filters</span>
        <select
          className={`selectGlobal ${styles.select}`}
          name="category"
          value={selection.category}
          onChange={(e) => handleFilters(e)}
        >
          <option value="" hidden>
            Category...
          </option>
          {locationCars.categories?.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
          <option value=''>All</option>
        </select>
        <select
          className={`selectGlobal ${styles.select}`}
          name="brand"
          value={selection.brand}
          onChange={(e) => handleFilters(e)}
        >
          <option value="" hidden>
            Brand...
          </option>
          {locationCars.brands?.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
          <option value=''>All</option>
        </select>
        <div className={styles.divider}></div>
      </div>
      <div>
        <span>Order</span>
        <select
          className={`selectGlobal ${styles.select}`}
          name="orderType"
          value={selection.orderType}
          onChange={(e) => handleFilters(e)}
        >
          <option value="pricePerDay">Price</option>
          <option value="rating">Rating</option>
        </select>
        <select
          className={`selectGlobal ${styles.select}`}
          name="order"
          value={selection.order}
          onChange={(e) => handleFilters(e)}
        >
          <option value="ASC">Low to High</option>
          <option value="DESC">High to Low</option>
        </select>
      </div>
    </div>
  );
}

export default CarFilters;



