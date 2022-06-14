import React, { useState } from "react";
import styles from "./adminReservList.module.css";
import { useEffect } from "react";
import ReservListItem from "./ReservListItem";
import { useDispatch, useSelector } from "react-redux";
import { getAllReservations } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import AdminReservationsForm from "../AdminReservationForm/AdminReservationForm";

function AdminReservations() {
  const { getAccessTokenSilently } = useAuth0();
  const allOrders = useSelector((state) => state.orders);
  const [orderIdSearch, setOrderIdSearch] = useState("");
  const [reservationsOptions, setReservationsOptions] = useState(true);
  const [orderId, setOrderId] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllReservations(getAccessTokenSilently));
  }, []);

  function handleChangeSearch(e) {
    let orderIdSearch = e.target.value;
    setOrderIdSearch(orderIdSearch);
    dispatch(getAllReservations(getAccessTokenSilently, orderIdSearch));
  }

  function handleOption(id) {
    setReservationsOptions(!reservationsOptions);
    setOrderId(id)
  }

  return (
    <div>
      {reservationsOptions === true ? (
        <div>
          <div className={styles.searchReservation}>
            <input
              className={`inputGlobal ${styles.inputSearch}`}
              type="search"
              placeholder="Find reservation"
              value={orderIdSearch}
              onChange={handleChangeSearch}
            />
          </div>
          <div className={styles.usersBox}>
            {allOrders.length ? (
                <div className={styles.listTitle}>
                  <table className={styles.table}>
                   <thead>
                   <tr>
                    <th className={styles.tableTitle}>Email</th>
                    <th className={styles.tableTitle}>Reservation</th>
                    <th className={styles.tableTitle}>
                      StartingDate <br /> EndingDate
                    </th>
                    <th className={styles.tableTitle}>Status</th>
                    <th className={styles.tableTitle}>View more</th>
                    </tr>
                   </thead>
                   <tbody>
                    {allOrders?.map((order) => (
                      <ReservListItem key={order.id} order={order} handleOption={handleOption} />
                      ))}
                    </tbody>
                  </table>
                </div>
            ) : (
              <div>Reservation not found</div>
            )}
          </div>
        </div>
      ) : (
        <AdminReservationsForm orderId={orderId} handleOption={handleOption} />
      )}
    </div>
  );
}

export default AdminReservations;
