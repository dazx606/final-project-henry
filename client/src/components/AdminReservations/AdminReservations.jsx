import React, { useState } from "react";
import styles from "./adminReservList.module.css";
import { useEffect } from "react";
import ReservListItem from "./ReservListItem";
import { useDispatch, useSelector } from "react-redux";
import { getAllReservations } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";

function AdminReservations() {
  const { getAccessTokenSilently } = useAuth0();
  const allOrders = useSelector((state) => state.orders);
  console.log("🚀 ~ file: AdminReservations.jsx ~ line 12 ~ AdminReservations ~ allOrders", allOrders)
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllReservations(getAccessTokenSilently));
  }, []);

  function handleChangeSearch(e) {
    let userId = e.target.value;
    setUserId(userId);
    dispatch(getAllReservations(getAccessTokenSilently, userId));
  }

  return (
    <div>
      <div className={styles.searchReservation}>
        <input
          className={`inputGlobal ${styles.inputSearch}`}
          type="search"
          placeholder="Find reservation"
          value={userId}
          onChange={handleChangeSearch}
        />
      </div>
      <div className={styles.usersBox}>
        <div className={styles.userListItem}>
          {allOrders.length ? (
            <>
              <div className={styles.imgIcon}></div>
              {/* <div className={styles.name}>First Name</div>
          <div className={styles.name}>Last Name</div> */}
              <div className={styles.email}>Email</div>
              <div className={styles.reservation}>Reservation</div>
              <div className={styles.startingDate}>
                StartingDate <br /> EndingDate
              </div>
              <div className={styles.trashIcon}>Delete</div>
            </>
          ) : (
            <div>Reservation not found</div>
          )}
        </div>
        {allOrders?.map((u) => (
          <ReservListItem key={u.id} order={u} />
        ))}
      </div>
    </div>
  );
}

export default AdminReservations;
