import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocationCars } from "../../redux/actions";

import styles from "./CarFilters.module.css";

function CarFilters({ locationId, selection, setSelection }) {
  const dispatch = useDispatch();
  const locationCars = useSelector((state) => state.locationCars);

  useEffect(() => {
    dispatch(getLocationCars(locationId));
  }, [dispatch]);

  return (
    <div className={styles.filters}>
      <select
        className={styles.select}
        name="order-type"
        onChange={(e) =>
          setSelection({ ...selection, orderType: e.target.value })
        }
      >
        <option value="pricePerDay">Price</option>
        <option value="rating">Rating</option>
      </select>
      <select
        className={styles.select}
        name="order"
        onChange={(e) => setSelection({ ...selection, order: e.target.value })}
      >
        <option value="ASC">Low to High</option>
        <option value="DESC">High to Low</option>
      </select>
      <input
        type="date"
        name="date"
        className={styles.select}
        onChange={(e) => setSelection({ ...selection, date: e.target.value })}
      />
      <select
        className={styles.select}
        name="car-type"
        onChange={(e) =>
          setSelection({ ...selection, carType: e.target.value })
        }
      >
        <option value="" hidden>
          Category...
        </option>
      </select>
      <select
        className={styles.select}
        name="brand"
        onChange={(e) => setSelection({ ...selection, brand: e.target.value })}
      >
        <option value="" hidden>
          Brand...
        </option>
      </select>
    </div>
  );
}

export default CarFilters;
