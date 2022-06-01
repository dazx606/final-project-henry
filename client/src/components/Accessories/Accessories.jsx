import React from "react";

import styles from "./Accessories.module.css";

function Accessories({ carDetails }) {
  return (
    <div className={styles.container}>
      <div className={styles.options}>
        <div className={styles.info}>
          <div className={styles.optionsinfo}>
            <div className={styles.infoicon}>
              <i className="fa-solid fa-couch"></i>
            </div>
            <span className={styles.infonumber}>{carDetails.passengers}</span>
          </div>
          <div className={styles.optionsinfo}>
            <div className={styles.infoicon}>
              <i className="fa-solid fa-gears"></i>
            </div>
            <span className={styles.infonumber}>{carDetails.engine} lts</span>
          </div>
          <div className={styles.optionsinfo}>
            <div className={styles.infoicon}>
              <i className="fa-solid fa-gas-pump"></i>
            </div>
            <span className={styles.infonumber}>
              {carDetails.consumption} km/l
            </span>
          </div>
        </div>
        <span className={styles.text}>Included Equipment</span>
        <div className={styles.info}>
          {carDetails.includedEquipments.map((element) => {
            if (
              element.name === "Manual Transmission" ||
              element.name === "Automatic Transmission"
            )
              return (
                <span className={styles.infoicon}>
                  {element.name.split(" ")[0]}
                </span>
              );
            if (element.name === "Radio")
              return (
                <div className={styles.infoicon}>
                  <i className="fa-solid fa-radio"></i>
                </div>
              );
            if (element.name === "Airconditioning")
              return (
                <div className={styles.infoicon}>
                  <i className="fa-solid fa-fan"></i>
                </div>
              );
            if (element.name === "Electric Windows")
              return (
                <div className={styles.infoicon}>
                  <i className="fa-solid fa-bolt-lightning"></i>
                </div>
              );
            if (element.name === "Bluetooth")
              return (
                <div className={styles.infoicon}>
                  <i className="fa-brands fa-bluetooth"></i>
                </div>
              );
            if (element.name === "Power steering")
              return (
                <div className={styles.infoicon}>
                  <i className="fa-solid fa-road"></i>
                </div>
              );
          })}
        </div>
        <span className={styles.text}>Accessories Available</span>
        <div className={styles.info}>
          {carDetails.optionalEquipments.map((element) => {
            if (element.name === "GPS")
              return (
                <div className={styles.infoicon}>
                  <i className="fa-solid fa-location-arrow"></i>
                </div>
              );
            if (element.name === "Child seat")
              return (
                <div className={styles.infoicon}>
                  <i className="fa-solid fa-child-reaching"></i>
                </div>
              );
            if (element.name === "Baby seat")
              return (
                <div className={styles.infoicon}>
                  <i className="fa-solid fa-baby-carriage"></i>
                </div>
              );
          })}
        </div>
      </div>
    </div>
  );
}

export default Accessories;
