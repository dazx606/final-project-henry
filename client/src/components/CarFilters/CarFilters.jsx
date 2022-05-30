import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocationCars } from "../../redux/actions";

import styles from "./CarFilters.module.css";

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
      <span>Check availability from:</span>
      <input
        type="date"
        name="startingDate"
        value={selection.startingDate}
        className={styles.select}
        onChange={(e) =>
          handleFilters(e)}
      />
      <span className={styles.to}>to:</span>
      <input
        type="date"
        name="endingDate"
        value={selection.endingDate}
        className={styles.select}
        onChange={(e) =>
         handleFilters(e)}
      />
      <div className={styles.divider}></div>
      <span>Filters</span>
      <select
        className={styles.select}
        name="category"
        value={selection.category}
        onChange={(e) =>
          handleFilters(e)}
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
        className={styles.select}
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
      <span>Order</span>
      <select
        className={styles.select}
        name="orderType"
        value={selection.orderType}
        onChange={(e) =>
          handleFilters(e)}
      >
        <option value="pricePerDay">Price</option>
        <option value="rating">Rating</option>
      </select>
      <select
        className={styles.select}
        name="order"
        value={selection.order}
        onChange={(e) => handleFilters(e)}
      >
        <option value="ASC">Low to High</option>
        <option value="DESC">High to Low</option>
      </select>
    </div>
  );
}

export default CarFilters;
