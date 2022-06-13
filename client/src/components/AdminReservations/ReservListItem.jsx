import React from "react";
import styles from "./adminReservList.module.css";

export default function ReservListItem({ order, handleOption }) {
  function handleClickReservation() {
    navigator.clipboard.writeText(order.id);
  }
  return (
    <tr className={styles.userListItem}>
    <td className={styles.tableCell}>{order.user?.email}</td>
    <td onClick={handleClickReservation} className={`${styles.tableCell} ${styles.pointer}`}>
      {order.id}
    </td>
    <td className={styles.tableCell}>
      {order.startingDate} <br />
      {order.endingDate}
    </td>
    <td className={styles.tableCell}>{order.status}</td>

    <td className={styles.tableCell}>
      <button className={styles.eye} onClick={() => handleOption(order.id)}>
        <i className="fa-solid fa-eye"></i>
      </button>
    </td>
  </tr>
  );
}
