import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from "@auth0/auth0-react";
import { showAlert } from '../../redux/actions';
import Authentication from "../Authenti/Authentication";
import styles from "./NavBar.module.css";
import Alert from "../Alert/Alert";
import Rating from "../Rating/Rating";
import logo from "./logoCar.png"

function NavBar() {
  const [display, setDisplay] = useState(false);
  const [showLinks, setShowLinks] = useState(false); //---------------------------
  const hide = useSelector((state) => state.hideAlert);
  const { loginWithPopup, isAuthenticated, user } = useAuth0();

  const dispatch = useDispatch();

  function handleLoginInfo() {
    if (isAuthenticated) setDisplay(!display);
    if (!isAuthenticated) loginWithPopup()
  }

  const showAllLinks = () => {
    setShowLinks(!showLinks);
  }

  const handleFleet = () => {
    if (window.location.pathname.split("/")[1] !== "city") dispatch(showAlert(false));
    setShowLinks(!showLinks);
  }

  return (
    <div className={styles.navSuperContainer}>
      <div className={styles.navcontainer}>
        <input type="checkbox" id="btn-nav" className={styles.checkbox} checked={showLinks} onChange={() => { }} />
        <header className={styles.header}>
          <div className={styles.headercontainer}>
            <label htmlFor="btn-nav" className={styles.btnLabel} onClick={showAllLinks}>
              <div className={styles.headerButton}></div>
            </label>

            <NavLink className={styles.tittle} to="/">              
              <h1><img src={logo} className={styles.logoC} alt="" />LUXURENT</h1>
            </NavLink>

            {isAuthenticated ?
              <div onClick={handleLoginInfo} className={styles.logIcon} >
                <div >{user.given_name ? user.given_name[0].toLocaleUpperCase() : user.nickname[0].toLocaleUpperCase()}</div>
              </div>
              :
              <div onClick={handleLoginInfo} className={styles.icon} >
                <i className="fa-solid fa-user"></i>
              </div>
            }
            {display && <Authentication setDisplay={setDisplay} display={display} handleLoginInfo={handleLoginInfo} />}
            {/* <NavLink to="/login" className={styles.icon}>
              <i className="fa-solid fa-user"></i>
            </NavLink> */}
          </div>
        </header>
        <nav className={styles.menu} hidden={!showLinks}>
          <ul className={styles.link}>
            <NavLink to="/">
              <li className={styles.list} onClick={showAllLinks}>HOME</li>
            </NavLink>
            <NavLink to={window.location.pathname}>
              <li className={styles.list} onClick={handleFleet}>MODELS</li>
            </NavLink>
            <NavLink to="/booking">
              <li className={styles.list} onClick={showAllLinks}>BOOKING</li>
            </NavLink>
            <NavLink to="/about">
              <li className={styles.list} onClick={showAllLinks}>ABOUT US</li>
            </NavLink>
            <NavLink to="/contact">
              <li className={styles.list} onClick={showAllLinks}>CONTACT US</li>
            </NavLink>

          </ul>
        </nav>
        {!hide &&
          <div className={styles.alert} >
            <Alert />
          </div>
        }

        <Rating />

      </div>
      <Outlet />
    </div>
  );
}

export default NavBar;
