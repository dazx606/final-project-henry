import React, { useState } from 'react'
import style from "./Rating.module.css";

function Rate({ dbUser }) {
    const [rating, setRating] = useState(0)
    const stars = [1, 2, 3, 4, 5];
    let fullStars = [...Array(rating)];
    let emptyStars = [...Array(5 - rating)];
    // onClick={() => handleRating(fs)}

    const handleRating = (fs) => {
        setRating(fs);
        setTimeout()
    }

    return (
        <div id='All' className={style.all}>
            <div className={`boxGlobal ${style.popUpcont}`}>
                <div>Give us some feedback!</div>

                <div className={style.info} >
                    <div className={style.question} >How did you enjoy using our {dbUser.reservations[0].brand} {dbUser.reservations[0].model}?</div>
                    <img className={style.carImg} src={dbUser.reservations[0].img} />
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
                                stars.map((s) => {
                                    return (
                                        <div key={s} className={style.stars} onClick={() => handleRating(s)} >
                                            <i className="fa-regular fa-star"></i>
                                        </div>
                                    )
                                })
                        }
                        {
                            emptyStars.length &&
                                emptyStars.length !== 5 ?
                                emptyStars.map((es) => {
                                    return (
                                        <div key={es} className={style.stars} >
                                            <i className="fa-regular fa-star"></i>
                                        </div>
                                    )
                                })
                                : null
                        }

                    </div>
                    <div className={style.btonCont}>
                        <button className={`buttonGlobal ${style.btonDismiss}`}>Dismiss</button>
                    </div>

                </div>
            </div>

        </div>

    )
}

export default Rate