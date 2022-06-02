import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Authentication from "../Authenti/Authentication";
import styles from "./NavBar.module.css";

function NavBar() {
  const [display, setDisplay] = useState(false);
  const { loginWithPopup, isAuthenticated, user } = useAuth0();

  function handleLoginInfo() {
    if (isAuthenticated) setDisplay(!display);
    if (!isAuthenticated) loginWithPopup()
  }

  return (
    <div>
      <div className={styles.navcontainer}>
        <input type="checkbox" id="btn-nav" className={styles.checkbox} />
        <header className={styles.header}>
          <div className={styles.headercontainer}>
            <label htmlFor="btn-nav" className={styles.btnLabel}>
              <div className={styles.headerButton}></div>
            </label>
            <NavLink className={styles.tittle} to="/"><h1>RENT A CAR</h1></NavLink>

            {isAuthenticated ?
              <div onClick={handleLoginInfo} className={styles.logIcon} >
                <div >{user.given_name ? user.given_name[0].toLocaleUpperCase() :  user.nickname[0].toLocaleUpperCase()}</div>
              </div>
              :
              <div onClick={handleLoginInfo} className={styles.icon} >
                <i className="fa-solid fa-user"></i>
              </div>
            }
            {display && <Authentication handleLoginInfo={handleLoginInfo} />}
            {/* <NavLink to="/login" className={styles.icon}>
              <i className="fa-solid fa-user"></i>
            </NavLink> */}
          </div>
        </header>
        <nav className={styles.menu}>
          <ul className={styles.link}>
            <NavLink to="/">
              <li>HOME</li>
            </NavLink>
            <NavLink to="/about">
              <li>ABOUT US</li>
            </NavLink>
            <NavLink to="/contact">
              <li>CONTACT US</li>
            </NavLink>
            <NavLink to="/booking">
              <li>BOOKING</li>
            </NavLink>
          </ul>
        </nav>
      </div>

      <Outlet />
    </div>
  );
}

export default NavBar;
