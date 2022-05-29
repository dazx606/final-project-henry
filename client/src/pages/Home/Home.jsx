import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LocationFilter from '../../components/LocationFilter/LocationFilter'
import styles from './Home.module.css'

import Carousel from "../../components/Carousel/Carousel";
// import Categories from '../../components/Categories/Categories'
import Alert from '../../components/Alert/Alert'

function Home() {
    const city = useSelector((state) => state.city);
    const hide = useSelector((state)=>state.hideAlert)

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
           
            {/* <Categories /> */}
            <div className={styles.alert} hidden={hide}>
                <Alert />
            </div>

        </div>
    )

}

export default Home;
