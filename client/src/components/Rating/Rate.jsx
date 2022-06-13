import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { sendCarRating } from '../../redux/actions';
import { useAuth0 } from "@auth0/auth0-react";
import style from "./Rating.module.css";

function Rate({ dbUser, setHide }) {
    const { getAccessTokenSilently } = useAuth0();
    const dispatch = useDispatch();
    const [rating, setRating] = useState(0)
    const stars = [1, 2, 3, 4, 5];
    let fullStars = [...Array(rating)];
    let emptyStars = [...Array(5 - rating)];

    useEffect(() =>{
        return () => {
            setRating(0);
        }
    }, [])

    const handleRating = (fs) => {
        setRating(fs)
        setTimeout(() => {
            dispatch(sendCarRating(getAccessTokenSilently, dbUser.data.id, { model: dbUser.reservations[0].model, rate: fs }))            
            setHide(true)
        },"300")
    }
    const handleDismiss = () =>{
        const reservCopy = [...dbUser.reservations];
        reservCopy.forEach(element => {
            dispatch(sendCarRating(getAccessTokenSilently, dbUser.data.id, { model: element.model, rate: 0 }))
        });
        setHide(true)
    }

    return (
        <div id='All' className={style.all}>
            <div className={`boxGlobal ${style.popUpcont}`}>
                <div>Give us some feedback!</div>

                <div className={style.info} >
                    <div className={style.question} >How did you enjoy our {dbUser.reservations[0]?.brand} {dbUser.reservations[0]?.model}?</div>
                    <img className={style.carImg} src={dbUser.reservations[0]?.img} />
                    <div className={style.starsCont}>
                        {
                            fullStars.length ?
                                fullStars.map((fs, i) => {
                                    return (
                                        <div key={i} className={style.stars} >
                                            <i className="fa-solid fa-star"></i>
                                        </div>
                                    )
                                })
                                :
                                stars.map((s, i) => {
                                    return (
                                        <div key={i} className={style.stars} onClick={() => handleRating(s)} >
                                            <i className="fa-regular fa-star"></i>
                                        </div>
                                    )
                                })
                        }
                        {
                            emptyStars.length &&
                                emptyStars.length !== 5 ?
                                emptyStars.map((es, i) => {
                                    return (
                                        <div key={i} className={style.stars} >
                                            <i className="fa-regular fa-star"></i>
                                        </div>
                                    )
                                })
                                : null
                        }
                    </div>
                    <div className={style.btonCont}>
                        <button className={`buttonGlobal ${style.btonDismiss}`} onClick={handleDismiss}>Dismiss</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Rate