import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styles from "./NavBar.module.css";

function NavBar() {
  return (
    <div>
      <div>
        <input type="checkbox" id="btn-nav" className={styles.checkbox} />
        <header className={styles.header}>
          <div className={styles.headercontainer}>
            <label for="btn-nav" className={styles.btnLabel}>
              <div className={styles.headerButton}></div>
            </label>
            <h1>RENT A CAR</h1>
            <NavLink to='/login' className={styles.icon}><i class="fa-solid fa-user"></i></NavLink>
          </div>
        </header>
        <nav className={styles.menu}>
          <ul className={styles.link}>
            <NavLink to='/'><li>HOME</li></NavLink>
            <NavLink to='/about'><li>ABOUT US</li></NavLink>
            <NavLink to='/contact'><li>CONTACT US</li></NavLink>
            <NavLink to='/booking'><li>BOOKING</li></NavLink>
          </ul>
        </nav>
      </div>
      <Outlet />
    </div>
  )
}

export default NavBar