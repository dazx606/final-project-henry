import { useDispatch, useSelector } from "react-redux";
import styles from "../../pages/ProfileOptions/ProfileOptions.module.css";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { setUserInfo } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";

export default function ProfileInfo() {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();
  const userInfo = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(setUserInfo(getAccessTokenSilently, userInfo.data?.email));
  }, [dispatch]);

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
            <span className={styles.proInfotle}>PROFILE INFORMATION</span>
            <NavLink to={`/user/${userInfo.data.id}`}>
              <button className={styles.edit}>
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
            </NavLink>
          </div>
          <div
            style={{ display: "flex", fontSize: ".8rem", padding: "1rem 1rem" }}
          >
            <div className={styles.firstinfo}>
              <div className={styles.info}>
                <span className={styles.infotitle}>Name</span>
                <span className={styles.infocontent}>
                  {userInfo.data.firstName ? userInfo.data.firstName : "N/A"}
                </span>
              </div>
              <div className={styles.info}>
                <span className={styles.infotitle}>LastName:</span>
                <span className={styles.infocontent}>
                  {userInfo.data.lastName ? userInfo.data.lastName : "N/A"}
                </span>
              </div>
              <div className={styles.info}>
                <span className={styles.infotitle}>
                  <i className="fa-solid fa-at"></i> Email
                </span>
                <span className={styles.infocontent}>
                  {userInfo.data.email ? userInfo.data.email : "N/A"}
                </span>
              </div>
              <div className={styles.info}>
                <span className={styles.infotitle}>
                  <i className="fa-solid fa-address-card"></i> Document ID
                </span>

                <span className={styles.infocontent}>
                  {userInfo.data.documentId ? userInfo.data.documentId : "N/A"}
                </span>
              </div>
              <div className={styles.info}>
                <span className={styles.infotitle}>
                  <i className="fa-solid fa-id-card"></i> License
                </span>
                <span className={styles.infocontent}>
                  {userInfo.data.license ? userInfo.data.license : "N/A"}
                </span>
              </div>
              <div className={styles.info}>
                <span className={styles.infotitle}>
                  <i className="fa-solid fa-phone"></i> Phone Number
                </span>
                <span className={styles.infocontent}>
                  {userInfo.data.phone ? userInfo.data.phone : "N/A"}
                </span>
              </div>
              <div className={styles.info}>
                <span className={styles.infotitle}>Prefered Language</span>
                <span className={styles.infocontent}>
                  {userInfo.data.language
                    ? userInfo.data.language.toUpperCase()
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
