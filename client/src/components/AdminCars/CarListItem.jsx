import React, { useEffect, useState } from 'react';
import style from "./AllCars.module.css";

function CarListItem({car, handleTClick}) {
  const noInfo = 'No Info';
    return (

        <div className={style.carListItem}>
            {car.carModel?.images ? <img className={style.imgIcon} src={car.carModel.images[0]} /> : null}
            <div className={style.brand}>{car.carModel ? car.carModel.brand : noInfo}</div>
            <div className={style.brand}>{car.carModelModel ? car.carModelModel : noInfo}</div>
            <div className={style.brand}>{car.carModel? car.carModel.rating : noInfo}</div>
            <div className={style.plate}>{car.license_plate}</div>
            <div className={style.trashIcon} value={car.id} name={car.license_plate} 
            onClick={() => handleTClick(car.license_plate)}
            >
                <i className="fa-solid fa-trash-can" ></i>
            </div>
        </div>


    )
}

export default CarListItem