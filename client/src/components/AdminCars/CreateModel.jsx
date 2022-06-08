import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getIncludedEquipment,
  getOptionalEquipment,
} from "../../redux/actions";
import { createModel } from "../../services/services";
import { useAuth0 } from "@auth0/auth0-react";

import styles from "./CreateModel.module.css";

const validate = (input) => {
  const errors = {};
  const filteredIncludedList = input.includedEquipment.filter(
    (item) =>
      item !== "Automatic Transmission" && item !== "Manual Transmission"
  );
  if (!input.model) errors.model = "Model name is required";
  if (!input.brand) errors.brand = "Brand name is required";
  if (!input.pricePerDay) errors.pricePerDay = "Price is required";
  if (!input.trunk) errors.trunk = "Trunk size is required";
  if (!input.passengers) errors.passengers = "Passengers is required";
  if (!input.consumption) errors.consumption = "Consumption is required";
  if (!input.engine) errors.engine = "Engine capacity is required";
  if (!input.carType) errors.carType = "Car type is required";
  if (!input.description) errors.description = "Description is required";
  if (
    input.includedEquipment[0] !== "Automatic Transmission" ||
    input.includedEquipment[0] !== "Manual Transmission"
  )
    errors.transmission = "Transmision is required";
  if (filteredIncludedList.length < 1)
    errors.includedEquipment = "Included equipment is required";
  if (input.optionalEquipment.length < 1)
    errors.optionalEquipment = "Optional equipment is required";
};

function CreateModel() {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const includedEquipment = useSelector((state) => state.includedEquipment);
  const optionalEquipment = useSelector((state) => state.optionalEquipment);

  const [input, setInput] = useState({
    model: "",
    brand: "",
    pricePerDay: "",
    trunk: "",
    passengers: "",
    consumption: "",
    engine: "",
    cardImage: "",
    mainImage: "",
    optionalImages: [],
    carType: "",
    includedEquipment: [],
    optionalEquipment: [],
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [optionalImage, setOptionalImage] = useState("");
  const [checker, setChecker] = useState(false);

  useEffect(() => {
    dispatch(getIncludedEquipment());
    dispatch(getOptionalEquipment());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    setChecker(true);
    if (!Object.keys(errors).length) {
      return await createModel({
        model: input.model,
        brand: input.brand,
        pricePerDay: input.pricePerDay,
        passengers: input.passengers,
        trunk: input.trunk,
        consumption: input.consumption,
        engine: input.engine,
        images: [input.cardImage, input.mainImage, ...input.optionalImages],
        carType: input.carType,
        description: input.description,
        includedEquipment: input.includedEquipment,
        optionalEquipment: input.optionalEquipment,
      });
    }
    e.preventDefault();
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    if (e.target.name === "optionalImage") {
      const validUrl = new RegExp(
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
      );
      if (validUrl.test(e.target.value)) setOptionalImage(e.target.value);
      else setOptionalImage("");
      return;
    }

    if (e.target.name === "included") {
      if (e.target.value === "") return;
      if (input.includedEquipment.includes(e.target.value)) return;
      setInput({
        ...input,
        includedEquipment: [...input.includedEquipment, e.target.value],
      });
      return;
    }
    if (e.target.name === "optional") {
      if (e.target.value === "") return;
      if (input.optionalEquipment.includes(e.target.value)) return;
      setInput({
        ...input,
        optionalEquipment: [...input.optionalEquipment, e.target.value],
      });
      return;
    }
    if (e.target.name === "transmission") {
      if (e.target.value === "") return;
      let updatedList = input.includedEquipment.filter(
        (item) =>
          item !== "Automatic Transmission" && item !== "Manual Transmission"
      );
      updatedList = [e.target.value, ...updatedList];
      setInput({
        ...input,
        includedEquipment: updatedList,
      });
      return;
    }
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    return;
  };

  const removeEquipment = (e) => {
    e.preventDefault();
    const updatedList = input[e.target.name].filter(
      (item) => item !== e.target.value
    );
    setInput({ ...input, [e.target.name]: updatedList });
  };

  const addOptionalImage = (e) => {
    e.preventDefault();
    if (optionalImage !== "") {
      const updatedList = [...input.optionalImages, optionalImage];
      setInput({
        ...input,
        optionalImages: updatedList,
      });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputcontainer}>
        <div className={styles.firstsplit}>
          <span className={styles.tag}>Model name</span>
          <input
            name="model"
            value={input.model}
            className={styles.input}
            type="text"
            onChange={handleInputChange}
          />
          <span className={styles.tag}>Brand name</span>
          <input
            name="brand"
            value={input.brand}
            className={styles.input}
            type="text"
            onChange={handleInputChange}
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className={styles.groupcontainer}>
              <span className={styles.tag}>Passengers</span>
              <div className={styles.inputgroup}>
                <input
                  name="passengers"
                  value={input.passengers}
                  className={styles.input}
                  type="number"
                  onChange={handleInputChange}
                />
                <i className="fa-solid fa-user" style={{ width: "100%" }}></i>
              </div>
            </div>
            <div className={styles.groupcontainer}>
              <span className={styles.tag}>Engine</span>
              <div className={styles.inputgroup}>
                <input
                  name="engine"
                  value={input.engine}
                  className={styles.input}
                  type="number"
                  onChange={handleInputChange}
                />
                <i className="fa-solid fa-gears" style={{ width: "100%" }}></i>
              </div>
            </div>
            <div className={styles.groupcontainer}>
              <span className={styles.tag}>Km / L</span>
              <div className={styles.inputgroup}>
                <input
                  name="consumption"
                  value={input.consumption}
                  className={styles.input}
                  type="number"
                  onChange={handleInputChange}
                />
                <i
                  className="fa-solid fa-gas-pump"
                  style={{ width: "100%" }}
                ></i>
              </div>
            </div>
          </div>
          <span className={styles.tag}>Trunk size</span>
          <select
            name="trunk"
            className={styles.input}
            onChange={handleInputChange}
          >
            <option value="" hidden></option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
          <span className={styles.tag}>Price per day</span>
          <input
            name="pricePerDay"
            value={input.pricePerDay}
            className={styles.input}
            type="number"
            placeholder="$"
            onChange={handleInputChange}
          />
          <span className={styles.tag}>Car type</span>
          <select
            name="carType"
            className={styles.input}
            onChange={handleInputChange}
          >
            <option value="" hidden></option>
            <option value="Luxury">Luxury</option>
            <option value="Premium">Premium</option>
            <option value="Pick-up">Pick-up</option>
            <option value="Van">Van</option>
            <option value="Hybrid">Hybrid</option>
            <option value="SUV Full-Size">SUV Full-Size</option>
            <option value="SUV">SUV</option>
          </select>
          <span className={styles.tag}>Transmission*</span>
          <select
            name="transmission"
            className={styles.input}
            onChange={handleInputChange}
          >
            <option value="" hidden></option>
            <option value="Automatic Transmission">Automatic</option>
            <option value="Manual Transmission">Manual</option>
          </select>
          <span className={styles.tag}>Description</span>
          <textarea
            className={styles.txtarea}
            value={input.description}
            name="description"
            cols="30"
            rows="8"
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className={styles.secondsplit}>
          <span className={styles.tag}>Included equipment</span>
          <select
            name="included"
            className={styles.input}
            onChange={handleInputChange}
          >
            <option value="" hidden></option>
            {includedEquipment?.map((item) => {
              if (
                item.name === "Automatic Transmission" ||
                item.name === "Manual Transmission"
              )
                return null;
              return (
                <option value={item.name} key={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>
          <div className={styles.equipment}>
            {input.includedEquipment?.map((item) => {
              if (
                item === "Automatic Transmission" ||
                item === "Manual Transmission"
              )
                return null;
              else {
                return (
                  <button
                    className={styles.selectionbutton}
                    name="includedEquipment"
                    value={item}
                    key={item}
                    onClick={removeEquipment}
                  >
                    {item}{" "}
                    <i
                      style={{ color: "var(--color4)" }}
                      className="fa-solid fa-rectangle-xmark"
                    ></i>
                  </button>
                );
              }
            })}
          </div>
          <span className={styles.tag}>Optional equipment</span>
          <select
            name="optional"
            className={styles.input}
            onChange={handleInputChange}
          >
            <option value="" hidden></option>
            {optionalEquipment?.map((item) => (
              <option value={item.name} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <div className={styles.equipment}>
            {input.optionalEquipment?.map((item) => (
              <button
                className={styles.selectionbutton}
                name="optionalEquipment"
                value={item}
                key={item}
                onClick={removeEquipment}
              >
                {item}{" "}
                <i
                  style={{ color: "var(--color4)" }}
                  className="fa-solid fa-rectangle-xmark"
                ></i>
              </button>
            ))}
          </div>
          <span
            className={styles.tag}
            style={{ textAlign: "center", marginBottom: "1rem" }}
          >
            IMAGES
          </span>
          <div className={styles.subinput}>
            <span className={styles.subtitle}>Card image</span>
            <div className={styles.imageinput}>
              <i
                className="fa-solid fa-image"
                style={{ padding: "0 0.5rem" }}
              ></i>
              <input
                name="cardImage"
                value={input.cardImage}
                className={styles.input}
                type="text"
                placeholder="e.g. http://www.example.com"
                onChange={handleInputChange}
              />
              {/*<button>
                <i className="fa-solid fa-plus"></i>
            </button>*/}
            </div>
          </div>
          <div className={styles.subinput}>
            <span className={styles.subtitle}>Main image</span>
            <div className={styles.imageinput}>
              <i
                className="fa-solid fa-panorama"
                style={{ padding: "0 0.5rem" }}
              ></i>
              <input
                name="mainImage"
                value={input.mainImage}
                className={styles.input}
                type="text"
                placeholder="e.g. http://www.example.com"
                onChange={handleInputChange}
              />
              {/*<button>
                <i className="fa-solid fa-plus"></i>
              </button>*/}
            </div>
          </div>
          <div className={styles.subinput}>
            <span className={styles.subtitle}>
              Optional image{" "}
              {optionalImage === "" && (
                <span style={{ color: "red", fontSize: "smaller" }}>
                  invalid url
                </span>
              )}
            </span>
            <div className={styles.imageinput}>
              <i
                className="fa-solid fa-images"
                style={{ padding: "0 0.5rem" }}
              ></i>
              <input
                name="optionalImage"
                className={styles.input}
                type="text"
                placeholder="e.g. http://www.example.com"
                onChange={handleInputChange}
              />
              <button onClick={addOptionalImage}>
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>

          <div className={styles.links}>
            {input.optionalImages?.map((item) => (
              <button
                className={styles.selectionbutton}
                name="optionalImages"
                value={optionalImage}
                key={item}
                onClick={removeEquipment}
              >
                optional image{" "}
                <i
                  style={{ color: "var(--color4)" }}
                  className="fa-solid fa-rectangle-xmark"
                ></i>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.submit}>
        <button type="submit" className={styles.create}>
          Create form
        </button>
      </div>
    </form>
  );
}

export default CreateModel;
