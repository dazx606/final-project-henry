import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import LocationFilter from '../../components/LocationFilter/LocationFilter'
import styles from './Home.module.css';
import { setCity, setSelection } from '../../redux/actions';

import Carousel from "../../components/Carousel/Carousel";
import Categories from '../../components/Categories/Categories'
import Alert from '../../components/Alert/Alert'
import Benefits from '../../components/Benefits/Benefits'

function Home() {
    const city = useSelector((state) => state.city);
<<<<<<< HEAD
    const hide = useSelector((state) => state.hideAlert)
=======
    const hide = useSelector((state) => state.hideAlert);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCity(''))
        dispatch(setSelection({brand: "",
        category: "",
        order: "ASC",
        startingDate: "",
        endingDate: "",
        orderType: "pricePerDay",
        page: 1}))
    }, [dispatch]);
>>>>>>> cc5d19f538924636e796f6fb8f109cbad697eac9

    return (
        <div className={styles.homeCont}>
            <div className={styles.slctBar}>
                <span className={styles.slCityT}>Select a city to find available cars</span>
                <LocationFilter />
                <Link to={`/city/${city}`}>
                    <button className={styles.goBtn}>Go</button>
                </Link>
            </div>
            <Carousel />

            <Categories />
            <div className={styles.alert} hidden={hide}>
                <Alert />
            </div>
            <div>
                <Benefits /> 
            </div>
        </div>
    )

}

export default Home;
