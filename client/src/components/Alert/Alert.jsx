import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { showAlert } from '../../redux/actions'
import LocationFilter from '../LocationFilter/LocationFilter'
import style from './Alert.module.css'

export default function Alert() {
    // const ref = useRef(null);
    const dispatch = useDispatch()
    const city = useSelector(state => state.city);
    const [activeBtn, setActiveBtn] = useState(true);

    useEffect(() => {
        if (city !== "") setActiveBtn(false)
        const element = document.getElementById("All")
        element.addEventListener("click", (event) => {
            if (event.target.id === "All") { 
                console.log("hola");
                dispatch(showAlert(true)) 
            }
        });
        //return () => dispatch(showAlert(true))
    }, [city])

    function handleClick() {
        dispatch(showAlert(true))
    }

    // const onClickOutside = () => { dispatch(showAlert(true)) }

    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         console.log(ref.current);
    //         console.log(event.target);
    //         if (ref.current && !ref.current.contains(event.target)) {
    //             onClickOutside && onClickOutside();
    //         }
    //     };
    //     document.addEventListener('click', handleClickOutside, true);
    //     return () => {
    //         document.removeEventListener('click', handleClickOutside, true);
    //     };
    // }, [onClickOutside]);

    // if (!props.show) return null;

    return (
        <div className={style.all} id="All" >
        <div className={style.alertContainer} id="Alert" >
            <h1 className={style.tittle}>Choose a city to continue</h1>
            <div className={style.seacrh}>
                <LocationFilter />
            </div>
            <NavLink to={`/city/${city}`}><button className={style.homeBtn} disabled={activeBtn} onClick={handleClick}>Select</button></NavLink>
        </div>
     </div>

    )
}