import React from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import styles from "./LoginPopup.module.css";

function LoginPopup({ children }) {
  const { loginWithPopup, isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    if (!isAuthenticated) loginWithPopup();
  };

  if (isAuthenticated) return null;
  return ReactDOM.createPortal(
    <>
      <div className={styles.overlay} />
      <div className={styles.popup}>
        <div className={styles.i}>
          <i className="fa-solid fa-circle-exclamation"></i>
        </div>
        <div className={styles.title}>
          To acces this page you need to sign in
        </div>
        <div className={styles.buttons}>
          <button className={styles.butt} onClick={login}>
            Sign in
          </button>
          <button className={styles.butt} onClick={() => navigate(-1)}>
            Close
          </button>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default LoginPopup;
