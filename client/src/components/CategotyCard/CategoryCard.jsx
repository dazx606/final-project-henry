import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setSelection, showAlert } from '../../redux/actions';
import style from './CategoryCard.module.css';




export default function CategotyCard(props) {
    const selection= useSelector(state => state.selection);
    const city = useSelector(state => state.city);
    const dispatch = useDispatch();

    
    function handleClick() {
        if (city === "") {
            dispatch(showAlert(false))
            dispatch(setSelection({...selection, category:props.card.value}))
        }
        else {
            dispatch(setSelection({...selection, category:props.card.value}))
        }
    }




    return (
        <NavLink to={city ? `/city/${city}` : ""}>
            <div className={style.card} onClick={handleClick}>
                <img className={style.images} src={props.card.image} alt={props.card.tittle} />

                <div className={style.tittle}>
                    <h3 >
                        {props.card.category}
                    </h3>
                </div>

            </div>
        </NavLink>
    )
}