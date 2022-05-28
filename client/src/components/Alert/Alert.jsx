
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { showAlert } from '../../redux/actions'
import LocationFilter from '../LocationFilter/LocationFilter'
import style from './Alert.module.css'

export default function Alert(props){
    const dispatch = useDispatch()
    const category = useSelector(state=>state.category);
    const city = useSelector(state=>state.city);
    
    function handleClick(){
        dispatch(showAlert(true))
    }
    
    return(
        <div hidden={props.hid} className={style.alertContainer}>
            <h1 className={style.tittle}>Choose a city to continue</h1>
            <div className={style.seacrh}>
                <LocationFilter/>
            </div>
            <NavLink to={`/city/${city}`}><button className={style.homeBtn} onClick={handleClick}>Select</button></NavLink>
        </div>
    )
}