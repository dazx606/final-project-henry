import React, { useEffect, useState } from "react";
import styles from "./adminReservationForm.module.css";
// import AddDriver from "./AddDriver";
import { getOrderReservationId, deleteReservation } from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import AlertConfirmation from "../AlertConfirmation/AlertConfirmation";

export default function AdminReservationForm({ orderId, handleOption }) {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertOk, setShowAlertOk] = useState(false);

  useEffect(() => {
    dispatch(getOrderReservationId(orderId, getAccessTokenSilently));
  }, []);

  function handleDeleteReservation() {
    dispatch(deleteReservation(getAccessTokenSilently, orderId));
    setShowAlert(false);
    setShowAlertOk(true)
  }
  function handleMessageOk() {
    setShowAlertOk(false);
    handleOption();
  }
  const amount = order?.paymentAmount?.length === 1 ?
    (Number(order?.paymentAmount[0]) / 100) :
    ((order?.paymentAmount?.reduce(
      (previousValue, currentValue) => Number(previousValue) + Number(currentValue),
      0)) / 100);




  if (order.error) {
    return <div>{order.error}</div>;
  }
  return (
    <div className={styles.textForm}>
      <div className={styles.usersBoxContainer}>
        <h2 className={styles.reservationTitle}>Reservation Detail:</h2>
        <form>
          <div className={styles.row}>
            <div className={styles.item}>
              <span className={styles.itemTitle}>FirstName: </span>

              <span>{order.user?.firstName}</span>
            </div>

            <div className={styles.item}>
              <span className={styles.itemTitle}>LastName: </span>

              <span>{order.user?.lastName}</span>
            </div>
          </div>

          <div className={styles.item}>
            <span className={styles.itemTitle}>Email: </span>
            <span>{order.user?.email}</span>
          </div>
          <div className={styles.item}>
            <span className={styles.itemTitle}>License: </span>
            <span>{order.user?.license}</span>
          </div>

          <div className={styles.item}>
            <span className={styles.itemTitle}>Reservation Status: </span>
            <span>{order.status}</span>
          </div>

          <div className={styles.item}>
            <span className={styles.itemTitle}>StartingDate: </span>
            <span>{order?.startingDate}</span>
            <span className={`${styles.itemTitle} ${styles.marginLeft}`}>EndingDate: </span>
            <span>{order?.endingDate}</span>
          </div>
          <div className={styles.item}>
            <span className={styles.itemTitle}>Payment Status: </span>
            <span>{order?.payed === true ? 'The customer has payed this reservation.' : 'The customer has not payed this reservation yet.'}</span>
          </div>
          <div className={styles.item}>
            <span className={styles.itemTitle}>PaymentAmount: </span>
            <span className={styles.paymentAmount}> $ {amount}</span>
          </div>
          <div className={styles.item}>
            <span className={styles.itemTitle}>Rated: </span>
            <span>{order?.rated === false ? 'The customer has not rated this car yet.' : 'The customer has rated this car.'}</span>
          </div>

          <div className={styles.item}>
            <span className={styles.itemTitle}>Car Information: </span>
            <span className={styles.marginLeft}>{order.individualCar?.carModel.brand} </span>
            <span>{order.individualCar?.carModel.model}</span>
          </div>
          <div className={styles.item}>
            <span className={styles.itemTitle}> Starting Location: </span>
            <span>{order.individualCar?.location.city}</span>
          </div>

          <div className={styles.item}>
            <span className={styles.itemTitle}> Ending Location: </span>
            <span>{order.location?.city}</span>
          </div>

          <div className={styles.item}>
            <span className={styles.itemTitle}> Driver: </span>
            <div className={styles.drivers}>
              {order.drivers?.map((driver) => (
                <div key={driver.id} className={styles.driverItem}>
                  <div>
                    <span className={styles.driverInfo}>firstName: </span>
                    {driver.firstName}
                  </div>
                  <div>
                    <span className={styles.driverInfo}>lastName: </span>
                    {driver.lastName}
                  </div>
                  <div>
                    <span className={styles.driverInfo}>license: </span>
                    {driver.licenseNumber}
                  </div>
                  <div>
                    <span className={styles.driverInfo}>documentId: </span> {driver.documentId}
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.divButtonContainer}>
              <button type='button' className={`buttonGlobal ${styles.button}`} onClick={() => setShowAlert(true)}>
                Delete
              </button>
              <button type='button' className={`buttonGlobal ${styles.viewAll}`} onClick={handleOption}> View All Reservations</button>
            </div>
          </div>
        </form>
      </div>

      <AlertConfirmation onCancel={() => setShowAlert(false)} showAlert={showAlert} onConfirmation={handleDeleteReservation} alertText={`Are you sure  you want to delete reservation ${orderId} ?`} buttonText={'Delete'} />
      <AlertConfirmation onCancel={handleMessageOk} showAlert={showAlertOk} onConfirmation={handleMessageOk} alertText={`Reservation ${orderId} deleted successfully`} buttonText={'Close'} />
    </div>
  );
}
