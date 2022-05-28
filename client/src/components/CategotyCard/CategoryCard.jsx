import { useDispatch, useSelector } from 'react-redux';
import { setCategory, showAlert } from '../../redux/actions';
import style from './CategoryCard.module.css';
export default function CategotyCard(props) {

    const city = useSelector(state=>state.city);
    const dispatch = useDispatch();


    function handleClick(){
        city==="" && dispatch(showAlert(false))
        dispatch(setCategory(props.card.value))
    }
    return (
        <div className={style.card} onClick={handleClick} >
            <img className={style.images} src={props.card.image} />
            
            <div className={style.tittle}>
                <h3 >
                    {props.card.category}
                </h3>
            </div>
            
        </div>
    )
}