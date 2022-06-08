import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userReservation } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./RentalDetails.module.css";

export default function RentalDetails({ match }) {

    const reservation = useSelector(state => state.userReservation);
    const dispatch = useDispatch();
    const { orderId } = useParams();
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        dispatch(userReservation(getAccessTokenSilently, orderId))
    }, [dispatch, getAccessTokenSilently, orderId]);

    return (
        <div className={styles.rentDetails}>
            <div className={styles.containerRent}>
                <div className={styles.detailsRent}>DETAILS</div>
                <div className={styles.containerRent2}>
                {
                    reservation ?
                        (
                            <table>
                                <tbody>
                                    <tr className={styles.itemsRent}>
                                        <td className={styles.itemsRent1}>Reservation Number:</td>
                                        <td className={styles.itemsRent2}>{reservation.order?.id}</td>
                                    </tr>
                                    <tr className={styles.itemsRent}>
                                        <td className={styles.itemsRent1}>Brand Car:</td>
                                        <td className={styles.itemsRent2}>{reservation.order?.individualCar.carModel.brand}</td>
                                    </tr>
                                    <tr className={styles.itemsRent}>
                                        <td className={styles.itemsRent1}>Model Car:</td>
                                        <td className={styles.itemsRent2}>{reservation.order?.individualCar.carModel.model}</td>
                                    </tr>
                                    <tr className={styles.itemsRent}>
                                        <td className={styles.itemsRent1}>Starting Date:</td>
                                        <td className={styles.itemsRent2}>{reservation.order?.startingDate}</td>
                                    </tr>
                                    <tr className={styles.itemsRent}>
                                        <td className={styles.itemsRent1}>Starting Location:</td>
                                        <td className={styles.itemsRent2}>{reservation.order?.individualCar.location.city}</td>
                                    </tr>
                                    <tr className={styles.itemsRent}>
                                        <td className={styles.itemsRent1}>Ending Date:</td>
                                        <td className={styles.itemsRent2}>{reservation.order?.endingDate}</td>
                                    </tr>
                                    <tr className={styles.itemsRent}>
                                        <td className={styles.itemsRent1}>Ending Location:</td>
                                        <td className={styles.itemsRent2}>{reservation.order?.location.city}</td>
                                    </tr>
                                    <tr className={styles.itemsRent}>
                                        <td className={styles.itemsRent1}>Drivers:</td>
                                        <td>
                                            {
                                                reservation.order?.drivers.map(d =>
                                                    <tr>
                                                        <td className={styles.itemsRent2}>{`${d.firstName} ${d.lastName}`}</td>
                                                    </tr>
                                                )
                                            }
                                        </td>
                                    </tr>
                                    <tr className={styles.itemsRent}>
                                        <td className={styles.itemsRent1}>Optional Equipment:</td>
                                        <td>
                                            {
                                                reservation.order?.optionalEquipments.map(e =>
                                                    <tr>
                                                        <td className={styles.itemsRent2}>{e.name}</td>
                                                    </tr>
                                                )
                                            }
                                        </td>
                                    </tr>
                                    <tr className={styles.itemsRent}>
                                        <td className={styles.itemsRent1}>Payment Amount:</td>
                                        <td className={styles.itemsRent2}>{`$ ${reservation.order?.paymentAmount}`}</td>
                                    </tr>
                                    <tr className={styles.itemsRent}>
                                        <td className={styles.itemsRent1}>Status:</td>
                                        <td className={styles.itemsRent2}>{reservation.order?.status}</td>
                                    </tr>
                                </tbody>
                            </table>
                        ) :
                        <div>Loading...</div>
                }
                </div>
            </div>
            <div className={styles.buttons}>
                <button className='buttonGlobal'>Modify Order</button>
                <button className='buttonGlobal'>Cancel Order</button>
            </div>
        </div>
    )
}