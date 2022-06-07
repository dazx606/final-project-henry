import React from "react";
import styles from "./adminReservList.module.css";

export default function ReservListItem({ order, handleShowAlert }) {
  function handleClickReservation() {
    navigator.clipboard.writeText(order.id);
  }
  return (
    <div className={styles.userListItem}>
      {/* <div className={styles.name}>{order.user.firstName ? order.user.firstName : null}</div>
      <div className={styles.name}>{order.user.lastName ? order.user.lastName : null}</div> */}
      <div className={styles.email}>{order.user?.email}</div>
      <div onClick={handleClickReservation} className={styles.reservation}>
        {order.id}
      </div>
      <div className={styles.startingDate}>
        {order.startingDate} <br />
        {order.endingDate}
      </div>
      <div className={styles.status}>{order.status}</div>

      <div onClick={() => handleShowAlert(order.id)} className={styles.trashIcon}>
        <i className="fa-solid fa-trash-can"></i>
      </div>
    </div>
  );
}
