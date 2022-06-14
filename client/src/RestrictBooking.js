import React, { useEffect } from 'react';
import ReactDOM from "react-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setUserInfo } from "./redux/actions";


import styles from "./components/LoginPopup/LoginPopup.module.css";
import Booking from './pages/Booking/Booking';

function RestrictBooking() {
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const dispatch = useDispatch();
  const dbUser = useSelector(state => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(setUserInfo(getAccessTokenSilently, user?.email));
    }
  }, [dispatch, user]);


  return dbUser.completed ? (
    <Booking />
  ) : (
    <NotCompleted />
  );
}

function NotCompleted({ children }) {
    const navigate = useNavigate();
    const dbUser = useSelector(state => state.user);
  
    const complete = (e) => {
      e.preventDefault();
      navigate(`/user/${dbUser.data.id}`)
    };
  
    if (dbUser.completed) return null;
    return ReactDOM.createPortal(
      <>
        <div className={styles.overlay} />
        <div className={styles.popup}>
          <div className={styles.i}>
            <i className="fa-solid fa-circle-exclamation"></i>
          </div>
          <div className={styles.title}>
            Before you book, you need to complete your profile.
          </div>
          <div className={styles.buttons}>
            <button className={styles.butt} onClick={complete}>
              Complete profile
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

export default RestrictBooking