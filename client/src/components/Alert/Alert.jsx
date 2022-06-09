import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { showAlert } from '../../redux/actions'
import LocationFilter from '../LocationFilter/LocationFilter'
import style from './Alert.module.css'

export default function Alert() {
    const dispatch = useDispatch()
    const city = useSelector(state => state.city);
    const [activeBtn, setActiveBtn] = useState(true);

    useEffect(() => {
        if (city !== "") setActiveBtn(false)
        const element = document.getElementById("All")
        element.addEventListener("click", (event) => {
            if (event.target.id === "All") { 
                dispatch(showAlert(true)) 
            }
        });
        //return () => dispatch(showAlert(true))
    }, [city])

    function handleClick() {
        dispatch(showAlert(true))
    }

    return (
        <div className={style.all} id="All" >
            <div className={style.alertContainer} id="Alert">
                <h1 className={style.tittle}>Select a city to continue</h1>
                <div className={style.seacrh}>
                    <LocationFilter className={style.select}/>
                </div>
                <NavLink to={`/city/${city}`}><button className={`buttonGlobal ${style.homeBtn}`} disabled={activeBtn} onClick={handleClick}>select</button></NavLink>
            </div>
        </div>
    )
}