import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./AboutUs.module.css";

export default function AboutUs() {
    return (
        <div className={styles.container}>
            <div className={styles.container1}>
                <div className={styles.subContainer1a}>
                    <h3 className={styles.titleh}>About Us</h3>
                    <h5 className={styles.titleh}>BUENOS AIRES RENT A CAR</h5>
                    <p className={styles.paragraph}>Rent A Car is an auto rental service based in Buenos Aires, offering a range of luxury and daily car rentals. Make your trip to the beautiful city of Buenos Aires or some of cities where we are, absolutely perfect by choosing one of our many rental options.</p>
                    <br />
                    <div className={styles.buttonContact}>
                        <NavLink to='/contact'>
                            <button className='buttonGlobal'>FIND US</button>
                        </NavLink>
                    </div>
                </div>
                <div className={styles.subContainer1b}>
                    <img className={styles.img1} src="https://www.caracteristicas.co/wp-content/uploads/2019/02/Buenos-aires-2-e1585704119889.jpg" alt="Buenos Aires" />
                </div>
            </div>
            <div className={styles.container2}>
                <div>
                    <img className={styles.img2} src="https://p3s7f5y3.rocketcdn.me/wp-content/uploads/2017/02/Equipo-de-trabajo-unido1-1.jpg" alt="Team"></img>
                </div>
                <div className={styles.subContainer2b}>
                    <h3 className={styles.titleh}>Personalized Attention</h3>
                    <p className={styles.paragraph}>It doesn’t matter if you’re here for business, or for pleasure. We have a car that matches all your needs. We have cars rentals for those family road trips and vacations, offering complete safety and functionality.</p>
                    <p className={styles.paragraph}>All our vehicles are in prime condition, with most of them being new. They are well-maintained, comfortable and come with no hidden charges. All our rates are upfront and you can get a quote from our website or speak to our customer representatives.</p>
                    <p className={styles.paragraph}>For premium car rentals in Latam, contact Rent a Car!</p>
                </div>
            </div>
            <div className={styles.button2}>
                <NavLink to='/'>
                    <button className='buttonGlobal'>HOME</button>
                </NavLink>
            </div>
        </div>

    )
}
