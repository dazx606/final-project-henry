import React, { useState } from "react";
import styles from "./adminReservList.module.css";
import { useEffect } from "react";
import ReservListItem from "./ReservListItem";
import { useDispatch, useSelector } from "react-redux";
import { deleteReservation, getAllReservations } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";

function AdminReservations() {
  const { getAccessTokenSilently } = useAuth0();
  const allOrders = useSelector((state) => state.orders);
  const [userId, setUserId] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [orderId, setOrderId] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllReservations(getAccessTokenSilently));
  }, []);

  function handleChangeSearch(e) {
    let userId = e.target.value;
    setUserId(userId);
    dispatch(getAllReservations(getAccessTokenSilently, userId));
  }

  function handleShowAlert(id) {
    setShowAlert(true);
    setOrderId(id);
  }

  function handleDeleteReservation() {
    dispatch(deleteReservation(getAccessTokenSilently, orderId));
    setShowAlert(false);
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
        {allOrders.length ? (
          <>
            <div className={styles.listTitle}>
              <div className={styles.imgIcon}></div>
              {/* <div className={styles.name}>First Name</div>
          <div className={styles.name}>Last Name</div> */}
              <div className={styles.email}>Email</div>
              <div className={styles.reservation}>Reservation</div>
              <div className={styles.startingDate}>
                StartingDate <br /> EndingDate
              </div>
              <div className={styles.trashIcon}>Delete</div>
            </div>
            {allOrders?.map((order) => (
              <ReservListItem handleShowAlert={handleShowAlert} key={order.id} order={order} />
            ))}
          </>
        ) : (
          <div>Reservation not found</div>
        )}
      </div>
      {showAlert && (
        <div>
          <div>Are you sure you want to delete this reservation?</div>
          <button onClick={handleDeleteReservation}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default AdminReservations;
