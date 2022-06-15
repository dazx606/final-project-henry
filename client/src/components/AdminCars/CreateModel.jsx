import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getIncludedEquipment,
  getOptionalEquipment,
} from "../../redux/actions";
import { createModel } from "../../services/services";
import { useAuth0 } from "@auth0/auth0-react";
import AlertConfirmation from "../AlertConfirmation/AlertConfirmation";

import styles from "./CreateModel.module.css";

const validate = (input) => {
  const errors = {};
  const validUrl = new RegExp(
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
  );
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
    input.includedEquipment[0] !== "Automatic Transmission" &&
    input.includedEquipment[0] !== "Manual Transmission"
  )
    errors.transmission = "Transmision is required";
  if (filteredIncludedList.length < 1)
    errors.includedEquipment = "Included equipment is required";
  if (input.optionalEquipment.length < 1)
    errors.optionalEquipment = "Optional equipment is required";
  if (!input.cardImage) errors.cardImage = "This is required";
  else if (!validUrl.test(input.cardImage)) errors.cardImage = "Invalid url";
  if (!input.mainImage) errors.mainImage = "This is required";
  else if (!validUrl.test(input.mainImage)) errors.mainImage = "Invalid url";
  if (input.optionalImages.length < 3) {
    errors.optionalImages = "At least 3 images are required";
    if (!validUrl.test(input.optionalImage))
      errors.optionalImage = "Invalid url";
  }

  return errors;
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
    optionalImage: "",
    carType: "",
    includedEquipment: [],
    optionalEquipment: [],
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [optionalImage, setOptionalImage] = useState("");
  const [checker, setChecker] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    dispatch(getIncludedEquipment());
    dispatch(getOptionalEquipment());
  }, [dispatch]);

  useEffect(() => {
    setErrors(validate({ ...input }));
  }, [input]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setChecker(true);
    if (!Object.keys(errors).length) {
      const response = await createModel(
        {
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
        },
        getAccessTokenSilently
      );
      if (response.msg === "This model already exist") {
        setShowError(true)
      } else {
        setShowAlert(true)
        setChecker(false);
      }
    }
  };

  const handleInputChange = (e) => {
    e.preventDefault();
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
    if (!errors.optionalImage) {
      if (input.optionalImages.includes(input.optionalImage)) return;
      const updatedList = [...input.optionalImages, input.optionalImage];
      setInput({
        ...input,
        optionalImages: updatedList,
        optionalImage: "",
      });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <AlertConfirmation
        onCancel={() => window.location.reload()} 
        showAlert={showAlert} 
        onConfirmation={() => window.location.reload()} 
        alertText={"Car Model created successfully"} 
        buttonText={'Continue'} />
        <AlertConfirmation
        onCancel={() => setShowError(false)} 
        showAlert={showError} 
        onConfirmation={() => setShowError(false)} 
        alertText={"Model name already in use"} 
        buttonText={'Continue'} />
      <div className={styles.inputcontainer}>
        <div className={styles.firstsplit}>
          <span className={styles.tag}>
            Model name{" "}
            {checker && errors.model && (
              <span style={{ color: "red", fontSize: "smaller" }}>
                {errors.model}
              </span>
            )}
          </span>
          <input
            name="model"
            value={input.model}
            className={styles.input}
            type="text"
            onChange={handleInputChange}
          />
          <span className={styles.tag}>
            Brand name{" "}
            {checker && errors.brand && (
              <span style={{ color: "red", fontSize: "smaller" }}>
                {errors.brand}
              </span>
            )}
          </span>
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
              {checker && errors.passengers && (
                <span style={{ color: "red", fontSize: "smaller" }}>
                  {errors.passengers}
                </span>
              )}
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
              {checker && errors.engine && (
                <span style={{ color: "red", fontSize: "smaller" }}>
                  {errors.engine}
                </span>
              )}
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
              {checker && errors.consumption && (
                <span style={{ color: "red", fontSize: "smaller" }}>
                  {errors.consumption}
                </span>
              )}
            </div>
          </div>
          <span className={styles.tag}>
            Trunk size{" "}
            {checker && errors.trunk && (
              <span style={{ color: "red", fontSize: "smaller" }}>
                {errors.trunk}
              </span>
            )}
          </span>
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
          <span className={styles.tag}>
            Price per day{" "}
            {checker && errors.pricePerDay && (
              <span style={{ color: "red", fontSize: "smaller" }}>
                {errors.pricePerDay}
              </span>
            )}
          </span>
          <input
            name="pricePerDay"
            value={input.pricePerDay}
            className={styles.input}
            type="number"
            placeholder="$"
            onChange={handleInputChange}
          />
          <span className={styles.tag}>
            Car type{" "}
            {checker && errors.carType && (
              <span style={{ color: "red", fontSize: "smaller" }}>
                {errors.carType}
              </span>
            )}
          </span>
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
          <span className={styles.tag}>
            Transmission{" "}
            {checker && errors.transmission && (
              <span style={{ color: "red", fontSize: "smaller" }}>
                {errors.transmission}
              </span>
            )}
          </span>
          <select
            name="transmission"
            className={styles.input}
            onChange={handleInputChange}
          >
            <option value="" hidden></option>
            <option value="Automatic Transmission">Automatic</option>
            <option value="Manual Transmission">Manual</option>
          </select>
          <span className={styles.tag}>
            Description{" "}
            {checker && errors.description && (
              <span style={{ color: "red", fontSize: "smaller" }}>
                {errors.description}
              </span>
            )}
          </span>
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
          <span className={styles.tag}>
            Included equipment{" "}
            {checker && errors.includedEquipment && (
              <span style={{ color: "red", fontSize: "smaller" }}>
                {errors.includedEquipment}
              </span>
            )}
          </span>
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
          <span className={styles.tag}>
            Optional equipment{" "}
            {checker && errors.optionalEquipment && (
              <span style={{ color: "red", fontSize: "smaller" }}>
                {errors.optionalEquipment}
              </span>
            )}
          </span>
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
            <span className={styles.subtitle}>
              Card image{" "}
              {checker && errors.cardImage && (
                <span style={{ color: "red", fontSize: "smaller" }}>
                  {errors.cardImage}
                </span>
              )}
            </span>
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
            <span className={styles.subtitle}>
              Main image{" "}
              {checker && errors.mainImage && (
                <span style={{ color: "red", fontSize: "smaller" }}>
                  {errors.mainImage}
                </span>
              )}
            </span>
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
              {checker && errors.optionalImage && (
                <span style={{ color: "red", fontSize: "smaller" }}>
                  {errors.optionalImage}
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
                value={input.optionalImage}
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
          {checker && errors.optionalImages && (
            <span style={{ color: "red", fontSize: "smaller" }}>
              {errors.optionalImages}
            </span>
          )}
          <div className={styles.links}>
            {input.optionalImages?.map((item) => (
              <button
                className={styles.selectionbutton}
                name="optionalImages"
                key={item}
                value={item}
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
          <button type="submit" className={`buttonGlobal ${styles.create}`}>
            Create
          </button>
      </div>
    </form>
  );
}

export default CreateModel;
