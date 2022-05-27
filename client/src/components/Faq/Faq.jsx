import React from "react";
import { NavLink } from "react-router-dom";
import styles from './faq.module.css'
import { useState } from "react";




export default function Faq() {

    const [display, setDisplay] = useState(false)

    function handleClick(e) {
        e.preventDefault()


        setDisplay(!display)
        console.log("🚀 ~ file: Faq.jsx ~ line 17 ~ handleClick ~ display", display)

    }



    return (
        <div className={styles.background}>
            <h1 className={styles.faq}>FAQ</h1>

            <div className={styles.content}>
                <div className={styles.contentTitle}>
                    <h2 className={styles.titles}>How Can I Pay For The Service?</h2>


                </div>
                <button onClick={e => handleClick(e)}> x</button>
                {!display ? <div></div> : <p>You can pay the rent in cash, credit or debit card; For the security deposit we ask for a credit card.</p>}
            </div>
            <div className={styles.content}>
                <h2 className={styles.titles}>What If I Need To Keep The Car A Bit Longer Than The Agreed Date And Time?</h2>
                <button>+</button>
                <p className={styles.text}>No Problem, let us know about your new plans. We will gladly help you.</p>
            </div>
            <div className={styles.content}>
                <h2 className={styles.titles}>Does My Child Have To Use A Car Seat?</h2>
                <button>+</button>
                <p className={styles.text}>Buenos aires Law requires that all children should stay in a booster seat until they are taller than 4 feet 9 inches and weigh more than 80 pounds. By general rule, the age to stop using a car seat is 6 years old. Rent a car won’t rent you a car if you don’t have a proper car seat while transporting children 5 years or younger.</p>
            </div>
            <div className={styles.content}> <h2 className={styles.titles}>Will I Receive A Confirmation Of My Online Reservation?</h2>
                <button>+</button>
                <p className={styles.text}>Yes! After submitting your request, you will receive an email with your reservation details and Pick Up instructions.</p>
            </div>
            <div className={styles.content}>
                <h2 className={styles.titles}>Can I Add An Additional Driver?</h2>
                <button>+</button>
                <p className={styles.text}>Yes, you can add up to 2 additional drivers. Each additional driver has to comply with the same condition as the primary driver. A fee will apply for adding each additional driver.</p>
            </div>
            <div className={styles.content}> <h2 className={styles.titles}>What Personal Identification I Have To Bring In Order To Rent A Car?</h2>
                <button>+</button>
                <p className={styles.text}>Each driver has to bring a valid Driver’s License. Non US Drivers must bring a second form of ID, Such as a Passport or a valid government issued ID. An International Driver License is necessary if the original Driver’s License is printed in non-Roman alphabet (such as Chinese, arabic, Cyrillic, etc.)</p>
            </div>


            <NavLink to='/' className={styles.navLink}>Go to Home</NavLink>

        </div>
    )
}