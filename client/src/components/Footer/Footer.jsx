
import { NavLink } from "react-router-dom";
import styles from "./footer.module.css";
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import React, { useMemo } from 'react';
import { useSelector } from "react-redux";

const apiKEY = process.env.REACT_APP_API_KEY;




function Map() {
    const locationCars = useSelector((state) => state.locationCars)
    const location = locationCars.latitude ? locationCars : { latitude: -34.81204911758577, longitude: -58.53459236831713 }
    const center = useMemo(() => ({ lat: location.latitude, lng: location.longitude }), [location.latitude, location.longitude]);

    return (
        <div>
            <GoogleMap zoom={12} center={center} mapContainerClassName={styles.mapContainer}>
                <Marker position={center} title='Aeropuerto Internacional Ezeiza' />
            </GoogleMap>

        </div>
    )
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

                <p>rent a car</p>

            </div>
            <div className={styles.map}>
                {
                    !isLoaded ? (<div>Loading...</div>) : <Map />
                }
            </div>
        </div>
    )
}
;
