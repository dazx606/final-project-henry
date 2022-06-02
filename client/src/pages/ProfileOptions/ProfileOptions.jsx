import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import styles from "./ProfileOptions.module.css";

function ProfileOptions() {
  const { isAuthenticated, loginWithPopup, isLoading } = useAuth0();
  const userInfo = useSelector((state) => state.user);

  return (
    <div className={styles.container}>
      <div className={styles.selection}>
        <div className={styles.selectionbox}>
          <button className={styles.options}>Profile Information</button>
          <button className={styles.options}>Orders</button>
          <button className={styles.options}>Otra opcion</button>
        </div>
      </div>
      <div className={styles.render}>
        <ProfileInfo />
      </div>
    </div>
  );
}

function ProfileInfo() {
  const userInfo = useSelector((state) => state.user);
  console.log(userInfo);
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
              PROFILE INFORMATION
            </span>
            <NavLink to={`/user/${userInfo.id}`}>
              <i className="fa-solid fa-pen-to-square"></i>
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

export default ProfileOptions;
