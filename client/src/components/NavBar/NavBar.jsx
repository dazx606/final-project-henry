import React from "react";
import { NavLink, Outlet } from "react-router-dom";
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
            <NavLink className={styles.tittle} to="/"><h1 className={styles.logo}>RENT A CAR</h1></NavLink>
            <NavLink to="/login" className={styles.icon}>
              <i className="fa-solid fa-user"></i>
            </NavLink>
          </div>
        </header>
        <nav className={styles.menu}>
          <ul className={styles.link}>
            <NavLink to="/">
              <li className={styles.list}>HOME</li>
            </NavLink>
            <NavLink to="/about">
              <li className={styles.list}>ABOUT US</li>
            </NavLink>
            <NavLink to="/contact">
              <li className={styles.list}>CONTACT US</li>
            </NavLink>
            <NavLink to="/booking">
              <li className={styles.list}>BOOKING</li>
            </NavLink>
          </ul>
        </nav>
      </div>

      <Outlet />
    </div>
  );
}

export default NavBar;
