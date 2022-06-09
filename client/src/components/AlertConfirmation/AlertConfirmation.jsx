import React from "react";
import styles from "./alertConfirmation.module.css";

export default function AlertConfirmation({ showAlert, onCancel, onConfirmation, alertText,buttonText }) {

  function handleClickAll(event) {
    if (event.target.id === "All") {
      onCancel()
    }
  }

  return showAlert && (
    <div className={styles.alert}>
      <div onClick={handleClickAll} className={styles.all} id="All">
        <div className={styles.alertContainer} id="alert">
          <div className={styles.sureTxt}>{alertText}</div>
          <button className={`buttonGlobal ${styles.dltBton}`} onClick={onConfirmation}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
