import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./CarCard.module.css";

function CarCard({ brand, model, pricePerDay, rating, image }) {
  const totalStars = 5;

  const yellowStars = Math.floor(rating);
  const greyStars = Math.floor(totalStars - rating);
  const halfStar = Number.isInteger(rating);

  return (
    <div className={`${styles.cardCont} ${styles.carColor}`}>
      <NavLink to={`/car/${model}`} className={styles.cardLink}>
        <h3 className={styles.carTitle}>
          {brand.toUpperCase()} {model.toUpperCase()}
        </h3>
        <h5 className={styles.carPrice}>US$ {pricePerDay}/day</h5>

        <div className={styles.starsCont}>
          {yellowStars &&
            [...Array(yellowStars)].map((i, k) => {
              return (
                <div className={styles.starY} key={k}>
                  <i className="fa-solid fa-star"></i>
                </div>
              );
            })}
          {!halfStar && (
            <div className={styles.starH}>
              <i className="fa-regular fa-star-half-stroke"></i>
            </div>
          )}
          {greyStars !== 0 &&
            [...Array(greyStars)].map((i, k) => {
              return (
                <div className={styles.starG} key={k}>
                  <i className="fa-regular fa-star"></i>
                </div>
              );
            })}
        </div>
        <div className={styles.photoContent}>
          <img
            className={styles.cardImg}
            src={image}
            alt={`a ${brand} ${model} vehicule`}
          />{" "}
        </div>
      </NavLink>
    </div>
  );
}

export default CarCard;
