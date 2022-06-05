import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useDispatch } from "react-redux";
import styles from "./adminReservList.module.css";
import { deleteReservation } from "../../redux/actions";

export default function ReservListItem({ order }) {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  function handleClick(e) {
    e.preventDefault();
    dispatch(deleteReservation(getAccessTokenSilently, order.id));
  }
  return (
    <div className={styles.userListItem}>
      {/* <div className={styles.name}>{order.user.firstName ? order.user.firstName : null}</div>
      <div className={styles.name}>{order.user.lastName ? order.user.lastName : null}</div> */}
      <div className={styles.email}>{order.user.email}</div>
      <div className={styles.reservation}>{order.userId}</div>
      <div className={styles.startingDate}>
        {order.startingDate} <br />
        {order.endingDate}
      </div>

      <div onClick={handleClick} className={styles.trashIcon}>
        <i className="fa-solid fa-trash-can"></i>
      </div>
    </div>
  );
}
