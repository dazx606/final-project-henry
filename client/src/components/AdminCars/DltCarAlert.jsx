import React, { useEffect } from 'react';
import style from "./AllCars.module.css";


function DltCarAlert({ alert, setAlert, handleDltClick, dltCar }) {

    useEffect(() => {
        if (alert === true) {
          const element = document.getElementById("All")
          element.addEventListener("click", (event) => {
            if (event.target.id === "All") {
              setAlert(false)
            }
          });
        }
      }, [])

    return (
        <div className={style.all} id='All' >
            <div className={style.alertContainer} id='alert' >
                <div className={style.sureTxt}>Are you sure you want to delete the car with the license plate {dltCar?.plate}?</div>
                <button className={`buttonGlobal ${style.dltBton}`} onClick={handleDltClick}>Delete</button>
            </div>
        </div>
    )
}

export default DltCarAlert