import React, { useEffect } from 'react';
import styles from "./AlertCancel.module.css";


export default function AlertCancel({ alert, setAlert, handleCancel, cancelOrder }) {

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
        <div className={styles.all} id='All' >

            <div className={styles.alertContainer} id='alert' >
                <div className={styles.sureTxt}>Are you sure you want to cancel the reservation {cancelOrder.rentId}?</div>
                <button className={`buttonGlobal ${styles.dltBton}`} onClick={handleCancel}>Cancel</button>

            </div>
        </div>
    )
}