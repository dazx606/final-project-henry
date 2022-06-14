import React from "react";
import { NavLink } from "react-router-dom";
import styles from './Faq.module.css'
import { useState } from "react";

function FaqItem({ title, text1, text2 }) {
    const [display, setDisplay] = useState(false)

    function handleClick() {
        setDisplay(!display)
    }

    return (
        <div onClick={e => handleClick(e)} className={styles.content}>
            <h2 className={styles.titles}>{title}</h2>
            <i className={`fa-solid fa-angle-down ${styles.arrow}`}></i>

            {!display ? '' : <>
                <p className={styles.text}>{text1}</p>
                <p className={styles.text}>{text2}</p>
            </>}
        </div>
    )
}


export default function Faq() {
    return (
        <div className={styles.background}>
            <h1 className={styles.faq}>FAQ</h1>

            <FaqItem title='How Can I Pay For The Service?' text1='You can pay the rent in cash, credit or debit card; For the security deposit we ask for a credit card.' />
            <FaqItem title='What If I Need To Keep The Car A Bit Longer Than The Agreed Date And Time?' text1='No Problem, let us know about your new plans. We will gladly help you.' text2='You can pay the rent in cash, credit or debit card; For the security deposit we ask for a credit card.' />
            <FaqItem title='Does My Child Have To Use A Car Seat?' text1='Buenos aires Law requires that all children should stay in a booster seat until they are taller than 4 feet 9 inches and weigh more than 80 pounds. By general rule, the age to stop using a car seat is 6 years old. Rent a car won’t rent you a car if you don’t have a proper car seat while transporting children 5 years or younger.' />
            <FaqItem title='Will I Receive A Confirmation Of My Online Reservation?' text1='Yes! After submitting your request, you will receive an email with your reservation details and Pick Up instructions.' />
            <FaqItem title='Can I Add An Additional Driver?' text1='Yes, you can add up to 2 additional drivers. Each additional driver has to comply with the same condition as the primary driver. A fee will apply for adding each additional driver.' />
            <FaqItem title='What Personal Identification I Have To Bring In Order To Rent A Car?' text1='Each driver has to bring a valid Driver’s License. Non US Drivers must bring a second form of ID, Such as a Passport or a valid government issued ID. An International Driver License is necessary if the original Driver’s License is printed in non-Roman alphabet (such as Chinese, arabic, Cyrillic, etc.)' />
            <div className={styles.containerButton}><NavLink to='/' className={styles.navLink}><button className='buttonGlobal'>Go Home</button></NavLink></div>
        </div>
    )
}
