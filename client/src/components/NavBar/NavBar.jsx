import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import LoginButton from "../LoginButton/LoginButton";
import LogoutButton from "../LogoutButton/LogoutButton";
import styles from "./NavBar.module.css";

function NavBar() {
  return (
    <div>
      <div className={styles.navcontainer}>
        <input type="checkbox" id="btn-nav" className={styles.checkbox} />
        <header className={styles.header}>
          <div className={styles.headercontainer}>
            <label htmlFor="btn-nav" className={styles.btnLabel}>
              <div className={styles.headerButton}></div>
            </label>
            <NavLink className={styles.tittle} to="/">
              <h1>RENT A CAR</h1>
            </NavLink>
            <NavLink to="/login" className={styles.icon}>
              <i className="fa-solid fa-user"></i>
            </NavLink>
            <LoginButton />
            <LogoutButton />
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
