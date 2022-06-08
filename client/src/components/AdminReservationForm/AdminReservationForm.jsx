import React, { useEffect, useState } from "react";
import styles from "./adminReservationForm.module.css";
// import AddDriver from "./AddDriver";
import { getOrderReservationId } from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function AdminReservationForm() {
  const { getAccessTokenSilently } = useAuth0();
  const { orderId } = useParams();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrderReservationId(orderId, getAccessTokenSilently));
  });

  return (
    <div className={styles.textForm}>
      <div className={styles.usersBox}>
        <h2 className={styles.reservationTitle}>Reservation Detail:</h2>
        <form>
          <div className={styles.firstNameContainer}>
            <span className={styles.firstName}>FirstName: </span>

            <span>{order.user?.firstName}</span>
          </div>

          <div className={styles.lastNameContainer}>
            <span className={styles.lastName}>LastName: </span>

            <span>{order.user?.lastName}</span>
          </div>
          <div className={styles.emailContainer}>
            <span className={styles.email}>Email: </span>
            <span>{order.user?.email}</span>
          </div>
          <div className={styles.licenseContainer}>
            <span className={styles.license}>License: </span>
            <span>{order.user?.license}</span>
          </div>

          <div className={styles.statusContainer}>Reservation Status: </div>
          <select>
            <option value="">status</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
            <option value="inUse">In-Use</option>
            <option value="maintenance">Maintenance</option>
          </select>
          <div>
            <span>StartingDate: </span>
            <span>{order?.startingDate}</span>
            <br />
            <span>EndingDate: </span>
            <span>{order?.endingDate}</span>
          </div>
          <div>
            Payed
            <span>{order?.payed}</span>
          </div>

          <br />
          <div>
            PaymentAmount
            <span>{order?.paymentAmount}</span>
          </div>
          <div>
            Rated
            <span>{order?.rated}</span>
          </div>

          <div>
            Car:
            <span>{order.individualCar?.carModel.model}</span>
            <br />
            <span>{order.individualCar?.carModel.brand}</span>
          </div>

          <div></div>
          <div>
            <div> Starting Location</div>
            <span>{order.individualCar?.location.city}</span>

            <div> Ending Location</div>
            <span>{order.location?.city}</span>
            <div>
              Driver:
              <div className={styles.drivers}>
                {order.drivers?.map((driver) => (
                  <div  key={driver.id} className={styles.driver}>
                    <div>firstName: {driver.firstName}</div>
                    <div>lastName: {driver.lastName}</div>
                    <div>license: {driver.licenseNumber}</div>
                    <div>documentId: {driver.documentId}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.divButtonContainer}>
              <button className={`buttonGlobal ${styles.button}`}>Edit</button>
              <button className={`buttonGlobal ${styles.button}`}>Delete</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
