import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LocationFilter from '../../components/LocationFilter/LocationFilter'
import styles from './Home.module.css'

import Carousel from "../../components/Carousel/Carousel";

function Home() {
    const city = useSelector((state) => state.city);

    return (
        <div className={styles.homeCont}>
            <div className={styles.slctBar}>
                <span className={styles.slCityT}>Looking for a Car? select a city </span>
                <LocationFilter />
                <Link to={`/city/${city}`}>
                    <button className={styles.goBtn}>Go</button>
                </Link>
            </div>
            <Carousel />
        </div>
    )

}

export default Home;
