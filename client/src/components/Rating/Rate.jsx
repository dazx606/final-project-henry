import React, { useState } from 'react'
import style from "./Rating.module.css";

function Rate({ dbUser }) {
    const [rating, setRating] = useState()
    const stars = [1, 2, 3, 4, 5];
    let fullStars = [ ...Array(rating)];
    // onClick={() => handleRating(fs)}

    return (
        <div className={`boxGlobal ${style.popUpcont}`}>
            <div>Give Feedback!</div>

            <div className={style.info} >
                <div className={style.question} >How did you enjoy the {dbUser.reservations[0].brand} {dbUser.reservations[0].model}?</div>
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
                            : null
                    }
                    {
                        stars.map((s) => {
                            return (
                                <div key={s} className={style.stars} >
                                    <i className="fa-regular fa-star"></i>
                                </div>
                            )
                        })
                    }
                </div>

            </div>






            {/* {
                dbUser.reservations?.map((r, i) => {

                    <div key={i} className={style.info} >
                        {console.log('hola')}
                        <div className={style.question} >How did you enjoy the {r.brand} {r.model}?</div>
                        <img src={r.img} />
                    </div>
                })
            } */}
        </div>
    )
}

export default Rate