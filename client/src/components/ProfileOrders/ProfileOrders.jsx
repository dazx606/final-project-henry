import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../pages/ProfileOptions/ProfileOptions.module.css";
import { userReservations } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";

export default function ProfileOrders() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const reservations = useSelector((state) => state.userReservations)
  const { getAccessTokenSilently }= useAuth0()

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
            <span style={{ fontSize: ".8rem", fontWeight: "700", paddingTop: "2em", paddingBottom: "2em" }}>
              MY RESERVATIONS
            </span>
          </div>
          <div>
            <div>
              <div style={{ display: "flex", fontSize: ".8rem", justifyContent: "space-between", textAlign: "center", lineHeight: "3em", paddingLeft: "2em" }}>
                <div style={{ width: "10%" }}>
                  <div>Number</div>
                </div>
                <div style={{ width: "15%" }}>
                  <div>Brand Car</div>
                </div>
                <div style={{ width: "15%" }}>
                  <div>Model Car</div>
                </div>
                <div style={{ width: "20%" }}>
                  <div>Starting Date</div>
                </div>
                <div style={{ width: "20%" }}>
                  <div>Ending Date</div>
                </div>
                <div style={{ width: "20%" }}>
                  <div>Location</div>
                </div>
              </div>
              {
                reservations ?
                  reservations?.map(r =>
                  (
                    <div style={{ display: "flex", fontSize: ".8rem", justifyContent: "space-between", textAlign: "center", lineHeight: "3em", paddingLeft: "2em" }}>
                      <div style={{ width: "10%" }}>
                        <div>{r.id}</div>
                      </div>
                      <div style={{ width: "15%" }}>
                        <div>{r.individualCar.carModel.brand}</div>
                      </div>
                      <div style={{ width: "15%" }}>
                        <div>{r.individualCar.carModelModel}</div>
                      </div>
                      <div style={{ width: "20%" }}>
                        <div>{r.startingDate}</div>
                      </div>
                      <div style={{ width: "20%" }}>
                        <div>{r.endingDate}</div>
                      </div>
                      <div style={{ width: "20%" }}>
                        <div>{r.individualCar.location.city}</div>
                      </div>
                    </div>
                  )
                  ) :
                  <div style={{display:"flex", justifyContent:"center"}}><p>You don't have any reservation. Go booking!</p></div>
              }
            </div>



          </div>
        </>
      )}
    </div>
  );
}