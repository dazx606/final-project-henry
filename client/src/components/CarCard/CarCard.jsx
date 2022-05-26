import React from "react";
import { Link } from "react-router-dom";
import styles from "./CarCard.module.css"

function CarCard({ carId, brand, model, pricePerDay, rating, image }) {
  const totalStars = 5;
  const yellowStars = Math.floor(rating);
  console.log(yellowStars)
  const greyStars = totalStars - yellowStars;
  const halfStar = rating !== 5 ? true : false;


  return (
    <div>

      <Link to={`/car/${carId}`}>
        <div className={styles.photoContent}><img className={styles.cardImg} src={image} alt={`a ${brand} ${model} vehicule`} /> </div>
        <h3 className={styles.carTitle}>{model} - {brand}</h3>
        <h5 className={styles.carPrice}>USD{pricePerDay} per day</h5>
        <div className={styles.star}>
          {yellowStars.length?.map(ys => {
            <div className={styles.starY}><i className='fa-solid fa star'></i></div>
          })}
          {halfStar && <div className={styles.starH}><i className="fa-duotone fa-star-half"></i></div>}
          {greyStars.length?.map(gs => {
            <div className={styles.starG}><i className='fa-solid fa star'></i></div>
          })}
        </div>
        
        
      </Link>
    </div>
  );
}

export default CarCard;
