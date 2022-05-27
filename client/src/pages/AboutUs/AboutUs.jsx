import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./AboutUs.module.css";

export default function AboutUs() {
    return (
        <div className={styles.container}>
            <div>
                <div>
                    <h3>About Us</h3>
                    <h5>BUENOS AIRES RENT A CAR</h5>
                    <p>Rent A Car is an auto rental service based in Buenos Aires, offering a range of luxury and daily car rentals. Make your trip to the beautiful city of Buenos Aires or some of cities where we are, absolutely perfect by choosing one of our many rental options.</p>
                </div>
                <div>
                    <img src="https://www.caracteristicas.co/wp-content/uploads/2019/02/Buenos-aires-2-e1585704119889.jpg" alt="Buenos Aires" />
                </div>
            </div>
            <div>
                <div>
                    <h3>Personalized Attention</h3>
                    <p>It doesn’t matter if you’re here for business, or for pleasure. We have a car that matches all your needs. We have cars rentals for those family road trips and vacations, offering complete safety and functionality.</p>
                    <p>All our vehicles are in prime condition, with most of them being new. They are well-maintained, comfortable and come with no hidden charges. All our rates are upfront and you can get a quote from our website or speak to our customer representatives.</p>
                    <p>For premium car rentals in Latam, contact Rent a Car!</p>
                </div>
                <div>
                    <img src="https://st.depositphotos.com/1473952/1344/i/600/depositphotos_13441796-stock-photo-bogota-and-the-andes-mountains.jpg" alt="Bogota"></img>
                    <img src="https://blogs.funiber.org/wp-content/uploads/2018/10/funiber-santiago-chile.jpeg" alt="Santiago de Chile"></img>
                    <img src="https://elviajista.com/wp-content/uploads/2019/05/dondealojarseenciudaddemexico.jpg" alt="Ciudad de Mexico"></img>
                </div>
            </div>
            <div>
            <NavLink to='/'>
                <button>GO HOME</button>
            </NavLink>
            </div>
        </div>

    )
}
