import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../pages/ProfileOptions/ProfileOptions.module.css";
import { userReservations } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";

export default function ProfileOrders() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const reservations = useSelector((state) => state.userReservations)
  const { getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    dispatch(userReservations(getAccessTokenSilently, userInfo.data.id))

  }, [dispatch, userInfo.data.id]);

  console.log(reservations)

  return (
    <div className={styles.profileinfo}>
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
            <div>
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
                    justifyContent: "center"
                  }}>
                    <p>You don't have any reservations. Go booking!</p>
                  </div>) :
                  reservations?.map(r =>
                  (
                    <div style={{
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
                        <div>{r.endingDate}</div>
                      </div>
                      <div style={{ width: "10%" }}>
                        <div>{r.status}</div>
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
            </div>



          </div>
        </>
      )}
    </div>
  );
}