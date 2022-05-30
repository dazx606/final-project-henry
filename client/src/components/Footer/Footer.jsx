import { NavLink } from "react-router-dom";
import styles from "./footer.module.css";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import React, { useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";

const apiKEY = process.env.REACT_APP_API_KEY;

function Map() {
  const locationCars = useSelector((state) => state.locationCars);
  const locations = useSelector((state) => state.locations);
  const location = locations.find(
    (location) => location.id === Number(locationCars.locationId)
  ) || { latitude: -34.81204911758577, longitude: -58.53459236831713 };
  const center = useMemo(
    () => ({ lat: location.latitude, lng: location.longitude }),
    [location.latitude, location.longitude]
  );

  return (
    <div>
      <GoogleMap
        zoom={14}
        center={center}
        mapContainerClassName={styles.mapContainer}
      >
        <Marker position={center} title="Aeropuerto Internacional Ezeiza" />
      </GoogleMap>
    </div>
  );
}

export default function Footer() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKEY,
  });
  return (
    <div className={styles.footer}>
      <div className={styles.links}>
        <NavLink to="/about" className={styles.navLinks}>
          <p>About us</p>
        </NavLink>
        <NavLink to="/contact" className={styles.navLinks}>
          <p>Contact us</p>
        </NavLink>
        <NavLink to="/booking" className={styles.navLinks}>
          <p>Booking</p>
        </NavLink>
        <NavLink to="/faqs" className={styles.navLinks}>
          <p>FAQ</p>
        </NavLink>
      </div>

      <div className={styles.icons}>
        <p className={styles.info}>Phone: +54 9 11 3220 1367</p>
        <p className={styles.info}>Email: info@rentacar.com</p>

        <i className={`fa-brands fa-facebook-f ${styles.icon}`}></i>

        <i className={`fa-brands fa-twitter ${styles.icon}`}></i>

        <i className={`fa-brands fa-instagram ${styles.icon}`}></i>

        <i className={`fa-brands fa-instagram ${styles.icon}`}></i>

        <p>rent a car</p>
      </div>
      <div className={styles.map}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28341.47959312231!2d-56.005543470382676!3d-27.385552962079938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9457bda9a39454b3%3A0xb113af93b0424633!2sAlamo%20Rent%20A%20Car!5e0!3m2!1ses-419!2sar!4v1653592124104!5m2!1ses-419!2sar"
          width="300"
          height="150"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
