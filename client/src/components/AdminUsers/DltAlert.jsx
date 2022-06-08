import React, { useEffect } from 'react';
import style from "./adminUsers.module.css";


function DltAlert({ alert, setAlert, handleDltClick, dltUser }) {

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
                <div className={style.sureTxt}>Are you sure you want to delete the user {dltUser.email}?</div>
                <button className={`buttonGlobal ${style.dltBton}`} onClick={handleDltClick}>Delete</button>

            </div>
        </div>
    )
}

export default DltAlert