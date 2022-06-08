import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocations, getModels } from "../../redux/actions";
import { createIndividualCar } from "../../services/services";
import { useAuth0 } from "@auth0/auth0-react";

import styles from "./CreateCar.module.css";

const validate = (input) => {
  const errors = {};
  if (!input.model) errors.model = "Model name is required";
  if (!input.licensePlate) errors.licensePlate = "License Plate is required";
  if (!input.year) errors.year = "Year is required";
  if (!input.location) errors.location = "Location is required";

  return errors;
};

function CreateCar() {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.locations);
  const models = useSelector((state) => state.modelNames);

  const [input, setInput] = useState({
    model: "",
    location: "",
    licensePlate: "",
    year: "",
  });
  const [errors, setErrors] = useState({});
  const [checker, setChecker] = useState(false);

  useEffect(() => {
    dispatch(getLocations());
    dispatch(getModels());
  }, [dispatch]);

  useEffect(() => {
    setErrors(validate({ ...input }));
  }, [input]);

  const handleInputChange = (e) => {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
    return;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setChecker(true);
    if (!Object.keys(errors).length) {
      return await createIndividualCar(
        {
          model: input.model,
          licensePlate: input.licensePlate,
          year: input.year,
          location: input.location,
        },
        getAccessTokenSilently
      );
    }
  };

  return (
    <div className={styles.container}>
      <span className={styles.title}>ADD NEW CAR TO COLLECTION</span>
      <form className={styles.form} onSubmit={handleSubmit}>
        <span className={styles.tag}>
          Select car model
          {checker && errors.model && (
            <span style={{ color: "red", fontSize: "smaller" }}>
              {errors.model}
            </span>
          )}
        </span>
        <select
          name="model"
          className={styles.input}
          onChange={handleInputChange}
        >
          <option value="" hidden></option>
          {models?.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <span className={styles.tag}>
          Select location{" "}
          {checker && errors.location && (
            <span style={{ color: "red", fontSize: "smaller" }}>
              {errors.location}
            </span>
          )}
        </span>
        <select
          name="location"
          className={styles.input}
          onChange={handleInputChange}
        >
          <option value="" hidden></option>
          {locations?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.city}
            </option>
          ))}
        </select>
        <span className={styles.tag}>
          License plate{" "}
          {checker && errors.licensePlate && (
            <span style={{ color: "red", fontSize: "smaller" }}>
              {errors.licensePlate}
            </span>
          )}
        </span>
        <input
          name="licensePlate"
          value={input.licensePlate}
          type="text"
          className={styles.input}
          onChange={handleInputChange}
        />
        <span className={styles.tag}>
          Year{" "}
          {checker && errors.year && (
            <span style={{ color: "red", fontSize: "smaller" }}>
              {errors.year}
            </span>
          )}
        </span>
        <input
          name="year"
          value={input.year}
          type="number"
          className={styles.input}
          onChange={handleInputChange}
        />
        <button type="submit" className={styles.create}>
          Add Car
        </button>
      </form>
    </div>
  );
}

export default CreateCar;
