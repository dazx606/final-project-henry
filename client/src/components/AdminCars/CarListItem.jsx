import React, { useEffect, useState } from 'react';
import style from "./AllCars.module.css";

function CarListItem({ car, handleTClick }) {
    const noInfo = 'No Info';
    const [more, setMore] = useState(false)

    const showMore = () => {
        setMore(!more)
    }
    return (
        <div className={style.bigItem} onClick={showMore}>
            <div className={style.carListItem}>
                <input type="checkbox" className={style.checkbox} checked={more} onChange={() => { }} />
                {car.carModel?.images ? <img className={style.imgIcon} src={car.carModel.images[0]} /> : null}
                <div className={style.brand}>{car.carModel ? car.carModel.brand : noInfo}</div>
                <div className={style.brand}>{car.carModelModel ? car.carModelModel : noInfo}</div>
                <div className={style.plate}>{car.license_plate}</div>

                <div className={style.more}>
                    <i className="fa-solid fa-angle-right"></i>
                </div>

            </div>

            <input type="checkbox" className={style.checkbox2} checked={more} onChange={() => { }} />
            <div className={style.carListItem2}>
                <div className={style.imgIcon}></div>
                <div>
                    <div className={style.brand}>Model Rating: </div>
                    <div className={style.brand}>{car.carModel ? car.carModel.rating : noInfo}</div>
                </div>

                <div>
                    <div className={style.brand}>Location:</div>
                    <div className={style.brand}>{car.location ? car.location.city : noInfo}</div>
                </div>
                <div>
                    <div className={style.plate}>Year: </div>
                    <div className={style.plate}>{car.year ? car.year : noInfo}</div>
                </div>

                <div className={style.trashIcon} value={car.id} name={car.license_plate}
                    onClick={() => handleTClick(car.license_plate)}
                >
                    <i className="fa-solid fa-trash-can" ></i>
                </div>

            </div>

        </div>

    )
}

export default CarListItem