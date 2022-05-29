import React from "react";
import styles from './Benefits.module.css';

export default function Benefits() {
    return (
        <div className={styles.container}>
            <div className={styles.container1}>
                <div className={styles.subContainer1a}>
                    <div className={styles.title}>
                        <h3>We Are in:</h3>
                    </div>
                    <div className={styles.list}>
                        <div>
                            <ul>
                                <li><i class="fa-solid fa-location-dot"></i> Buenos Aires</li>
                                <li><i class="fa-solid fa-location-dot"></i> Posadas</li>
                                <li><i class="fa-solid fa-location-dot"></i> Córdoba</li>
                                <li><i class="fa-solid fa-location-dot"></i> Rosario</li>
                                <li><i class="fa-solid fa-location-dot"></i> Ushuaia</li>
                                <li><i class="fa-solid fa-location-dot"></i> Bogotá</li>
                                <li><i class="fa-solid fa-location-dot"></i> Medellin</li>
                                <li><i class="fa-solid fa-location-dot"></i> Cali</li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li><i class="fa-solid fa-location-dot"></i> Ciudad de México</li>
                                <li><i class="fa-solid fa-location-dot"></i> Guadalajara</li>
                                <li><i class="fa-solid fa-location-dot"></i> Monterrey</li>
                                <li><i class="fa-solid fa-location-dot"></i> Santiago de Chile</li>
                                <li><i class="fa-solid fa-location-dot"></i> Iquique</li>
                                <li><i class="fa-solid fa-location-dot"></i> Maimi</li>
                                <li><i class="fa-solid fa-location-dot"></i> Orlando</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div>
                    <img className={styles.img1} src="https://cdn.forbes.co/2020/09/Medell%C3%ADn-foto-ProColombia.jpg" alt="Medellin Colombia" />
                </div>
            </div>
            <div>
            </div>
            <div className={styles.container2}>
                <div>
                    <img className={styles.img2} src="https://h7w7b8g4.stackpathcdn.com/wp-content/uploads/2017/10/miami-downtown.jpg" alt="Miami" />
                </div>
                <div className={styles.subContainer2a}>
                    <h3>Easy reservation</h3>
                    <p>Making a reservation and getting an upfront quote is fairly straightforward. You can enter the required details and book the car of your choice for the dates you need it. For any concerns, feel free to reach out to us and we’d be happy to help!</p>
                </div>
            </div>
            <div className={styles.container3}>
                <div className={styles.benefit}>
                    <h3>Rent A Car Agencies</h3>
                </div>
                <div className={styles.benefits1}>
                    <div>
                        <h4>1 - Vehicles To Meet The Demands</h4>
                        <p>Save time and money. We offer a wide selection of vehicles to cover all your needs; wether you are coming to Miami for business or fun, we have the car for you.</p>
                    </div>
                    <div>
                        <h4>2 - Great Daily Rates</h4>
                        <p>We offer unbeatable rates. Don't let your car rental experience be an unpleasant one. We give you the best final deal upfront.</p>
                    </div>
                    <div>
                        <h4>3 - No Hidden Charges, No Dirty Bills</h4>
                        <p>Tired of having a reservation for pennies just to discover that they wait you with expensive fees at the front desk? We in Rent A Car give you a full disclosure before you come.</p>
                    </div>
                </div>
                <div className={styles.benefits2}>
                    <div>
                        <h4>4 - Real Time Online Booking</h4>
                        <p>Using our online booking system has never been easier. We make daily adjustments to our website. Florida Premium offers you fast online bookings and low price guarantee!</p>
                    </div>
                    <div>
                        <h4>5 - Only Clean And Reliable Vehicles</h4>
                        <p>We in Rent A Car take care of our fleet, so you always drive a reliable car, cleaned and well maintained.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}