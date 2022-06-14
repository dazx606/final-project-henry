import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../pages/ProfileOptions/ProfileOptions.module.css";
import { userReservations } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import style from './profileOrders.module.css'
import AlertConfirmation from '../AlertConfirmation/AlertConfirmation'

export default function ProfileOrders() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const reservations = useSelector((state) => state.userReservations)
  const { getAccessTokenSilently } = useAuth0()
  const [showAlert, setShowAlert] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(userReservations(getAccessTokenSilently, userInfo.data.id))

  }, [dispatch, userInfo.data.id]);

  function handleAlert() {
    navigate('/booking')
    setShowAlert(false)
  }

  return (
    <div className={style.usersBox}>
      {userInfo.data && (
        <>
          <div
            style={{
              padding: "0 0.5rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <span style={{
              fontSize: ".8rem",
              fontWeight: "700",
              paddingTop: "2em",
              paddingBottom: "2em",
              color: "var(--color4)"
            }}>
              MY RESERVATIONS
            </span>
          </div>
          <div>

            <div className={style.listTitle}>
              <table className={style.table}>
                <thead>
                  <tr>
                    <th className={style.tableTitle}>Number</th>
                    <th className={style.tableTitle}>Car</th>
                    <th className={style.tableTitle}>Starting Date</th>
                    <th className={style.tableTitle}>Ending Date</th>
                    <th className={style.tableTitle}>Status</th>
                    <th className={style.tableTitle}>Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {!reservations.length ?
                    (
                      <AlertConfirmation
                        onCancel={() => setShowAlert(false)}
                        showAlert={showAlert}
                        onConfirmation={handleAlert}
                        alertText={"You don't have any reservations."}
                        buttonText={'Go booking!'} />
                    ) :
                    reservations?.map((r, k) =>
                    (
                      <tr key={k}>
                        <th >
                          {r.id}
                        </th>
                        <th>{`${r.individualCar.carModel.brand} ${r.individualCar.carModelModel}`}</th>
                        <th>{r.startingDate}</th>

                        <th>{(new Date(new Date((new Date(r.endingDate)).getTime()).setDate(new Date((new Date(r.endingDate)).getTime()).getDate() - 2))).toDateString()}</th>


                        <th>{r.status === 'maintenance' ? 'concluded' : r.status}</th>

                        <th>
                          <NavLink to={`/reservation/${r.id}`}>
                            <button style={{ background: "var(--color6Tr)", border: "0", cursor: "pointer" }}>
                              <i className="fa-solid fa-circle-info" style={{ color: "var(--color3)" }}></i>
                            </button>
                          </NavLink>
                        </th>

                      </tr>
                    )
                    )}

                </tbody>

              </table>
            </div>

          </div>
        </>
      )}
    </div>
  );
}