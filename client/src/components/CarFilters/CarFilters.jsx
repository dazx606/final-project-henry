import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocationCars } from "../../redux/actions";

import styles from "./CarFilters.module.css";

function CarFilters({ locationId, selection, setSelection }) {
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
        name="start-date"
        className={styles.select}
        onChange={(e) =>
          setSelection({ ...selection, startDate: e.target.value })
        }
      />
      <span className={styles.to}>to:</span>
      <input
        type="date"
        name="end-date"
        className={styles.select}
        onChange={(e) =>
          setSelection({ ...selection, endDate: e.target.value })
        }
      />
      <div className={styles.divider}></div>
      <span>Filters</span>
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
        {locationCars.categories?.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <select
        className={styles.select}
        name="brand"
        onChange={(e) => setSelection({ ...selection, brand: e.target.value })}
      >
        <option value="" hidden>
          Brand...
        </option>
        {locationCars.brands?.map((brand) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>
      <div className={styles.divider}></div>
      <span>Order</span>
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
    </div>
  );
}

export default CarFilters;
