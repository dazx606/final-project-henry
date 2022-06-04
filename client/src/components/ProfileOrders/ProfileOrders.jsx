import { useSelector } from "react-redux";
import styles from "../../pages/ProfileOptions/ProfileOptions.module.css";

export default function ProfileOrders() {
    const userInfo = useSelector((state) => state.user);
   
    return (
      <div className={styles.profileinfo}>
        {userInfo.data && (
          <>
            <div
              style={{
                padding: "0 0.5rem",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontSize: ".8rem", fontWeight: "700" }}>
                MY RESERVATIONS
              </span>
            </div>
            <div
              style={{ display: "flex", fontSize: ".8rem", padding: "1rem 1rem" }}
            ></div>
          </>
        )}
      </div>
    );
  }