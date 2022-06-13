import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../pages/ProfileOptions/ProfileOptions.module.css";
import { userReservations } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import style from './profileOrders.module.css'

export default function ProfileOrders() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const reservations = useSelector((state) => state.userReservations)
  const { getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    dispatch(userReservations(getAccessTokenSilently, userInfo.data.id))

  }, [dispatch, userInfo.data.id]);

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
          <div >
            {/* <div>
              <div style={{
                display: "flex",
                fontSize: ".8rem",
                justifyContent: "space-between",
                textAlign: "center",
                lineHeight: "3em",
                paddingLeft: "2em"
              }}>
                <div style={{ width: "10%", color: "var(--color4)" }}>
                  <div>Number</div>
                </div>
                <div style={{ width: "25%", color: "var(--color4)" }}>
                  <div>Car</div>
                </div>
                <div style={{ width: "20%", color: "var(--color4)" }}>
                  <div>Starting Date</div>
                </div>
                <div style={{ width: "20%", color: "var(--color4)" }}>
                  <div>Ending Date</div>
                </div>
                <div style={{ width: "10%", color: "var(--color4)" }}>
                  <div>Status</div>
                </div>
                <div style={{ width: "15%", color: "var(--color4)" }}>
                  <div>Details</div>
                </div>
              </div>
              {
                !reservations.length ?
                  (<div style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "2em"
                  }}>
                    <p>You don't have any reservations. Go booking!</p>
                  </div>) :
                  reservations?.map((r, k) =>
                  (
                    <div key={k} style={{
                      display: "flex",
                      fontSize: ".8rem",
                      justifyContent: "space-between",
                      textAlign: "center",
                      lineHeight: "3em",
                      paddingLeft: "2em"
                    }}>
                      <div style={{ width: "10%" }}>
                        <div>{r.id}</div>
                      </div>
                      <div style={{ width: "25%" }}>
                        <div>{`${r.individualCar.carModel.brand} ${r.individualCar.carModelModel}`}</div>
                      </div>
                      <div style={{ width: "20%" }}>
                        <div>{r.startingDate}</div>
                      </div>
                      <div style={{ width: "20%" }}>
                        <div>{(new Date(new Date((new Date(r.endingDate)).getTime()).setDate(new Date((new Date(r.endingDate)).getTime()).getDate() - 2))).toDateString()}</div>
                      </div>
                      <div style={{ width: "10%" }}>
                        <div>{r.status === 'maintenance' ? 'concluded' : r.status}</div>
                      </div>
                      <div style={{ width: "15%" }}>
                        <div>
                          <NavLink to={`/reservation/${r.id}`}>
                            <button style={{background: "var(--color6Tr)", border:"0", cursor: "pointer"}}>
                              <i className="fa-solid fa-circle-info" style={{color: "var(--color3)"}}></i>
                            </button>
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  )
                  )}
            </div> */}

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
                  {
                    !reservations.length ?
                      (<tr>
                        <th>You don't have any reservations. Go booking!</th>
                      </tr>) :
                      reservations?.map((r, k) =>
                      (
                        <tr>
                          <th>
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