import React from "react";

import styles from "./Accessories.module.css";

function Accessories({ carDetails }) {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.optionsinfo}>
          <div className={styles.infoicon} title="Number of passengers">
            {/* <i className="fa-solid fa-couch"></i> */}
            <img src="https://i.ibb.co/pf2S0YQ/car-seat-2.png" alt="" className={styles.img} />
          </div>
          <span className={styles.infonumber}>{carDetails.passengers}</span>
        </div>
        <div className={styles.optionsinfo}>
          <div className={styles.infoicon} title="Engine">
            {/* <i className="fa-solid fa-gears"></i> */}
            <img src="https://i.ibb.co/KmpNsNS/engine.png" alt="" className={styles.img} />
          </div>
          <span className={styles.infonumber}>{carDetails.engine} lts</span>
        </div>
        <div className={styles.optionsinfo}>
          <div className={styles.infoicon} title="Consumption">
            <i className="fa-solid fa-gas-pump"></i>
          </div>
          <span className={styles.infonumber}>
            {carDetails.consumption} km/l
          </span>
        </div>
      </div>
      <span className={styles.text}>Included equipment</span>
      <div className={styles.info}>
        {carDetails.includedEquipments.map((element, k) => {
          if (
            element.name === "Manual Transmission" ||
            element.name === "Automatic Transmission"
          )
            return (
              <span className={styles.infoicon} key={k} >
                {element.name.split(" ")[0]}
              </span>
            );
          if (element.name === "Radio")
            return (
              <div className={styles.infoicon} key={k} title="Radio">
                <i className="fa-solid fa-radio"></i>
              </div>
            );
          if (element.name === "Airconditioning")
            return (
              <div className={styles.infoicon} key={k} title="Air conditioning">
                <i className="fa-solid fa-snowflake"></i>
              </div>
            );
          if (element.name === "Electric Windows")
            return (
              <div className={styles.infoicon} key={k} title="Electric windows">
                <i className="fa-solid fa-bolt-lightning"></i>
              </div>
            );
          if (element.name === "Bluetooth")
            return (
              <div className={styles.infoicon} key={k} title="Bluetooth">
                <i className="fa-brands fa-bluetooth"></i>
              </div>
            );
          if (element.name === "Power steering")
            return (
              <div className={styles.infoicon} key={k} title="Power steering">
                {/* <i className="fa-solid fa-road"></i> */}
                <img src="https://i.ibb.co/T2DyGVY/steering-wheel.png" alt="" className={styles.img} />
              </div>
            );
        })}
      </div>
      <span className={styles.text}>Available accessories</span>
      <div className={styles.info}>
        {carDetails.optionalEquipments.map((element, k) => {
          if (element.name === "GPS")
            return (
              <div className={styles.infoicon} key={k} title="GPS">
                <i className="fa-solid fa-location-arrow"></i>
              </div>
            );
          if (element.name === "Child seat")
            return (
              <div className={styles.infoicon} key={k} title="Child seat">
                <i className="fa-solid fa-child-reaching"></i>
              </div>
            );
          if (element.name === "Baby seat")
            return (
              <div className={styles.infoicon} key={k} title="Baby seat">
                <i className="fa-solid fa-baby-carriage"></i>
              </div>
            );
        })}
      </div>
    </div>
  );
}

export default Accessories;
