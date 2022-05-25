import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLocations } from "../../redux/actions";

import styles from "./LocationFilter.module.css";

function LocationFilter() {
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.locations);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getLocations());
  }, [dispatch]);

  const handleChange = (e) => {
    navigate(`/city/${e.target.value}`);
  };

  return (
    <div>
      <select
        className={styles.select}
        name="locations"
        onChange={handleChange}
      >
        {locations &&
          locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.city}
            </option>
          ))}
      </select>
    </div>
  );
}

export default LocationFilter;
