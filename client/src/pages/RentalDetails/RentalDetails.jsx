import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userReservation } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./RentalDetails.module.css";

export default function RentalDetails() {

    const reservation = useSelector(state => state.userReservation);
    const dispatch = useDispatch();
    const { orderId } = useParams();
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        dispatch(userReservation(getAccessTokenSilently, orderId))
        console.log(reservation)
    }, [dispatch, orderId]);

    return (
        <div className={styles.rentDetails}>
            <div className={styles.containerRent}>
                <div className={styles.detailsRent}>DETAILS</div>
                <div className={styles.itemsRent}>
                    <div>Reservation Number:</div>
                    <div>{reservation.order.id}</div>
                </div>
                <div className={styles.itemsRent}>
                    <div>Brand Car:</div>
                    <div>{reservation.order.individualCar.carModel.brand}</div>
                </div>
                <div className={styles.itemsRent}>
                    <div>Model Car:</div>
                    <div>{reservation.order.individualCar.carModel.model}</div>
                </div>
                <div className={styles.itemsRent}>
                    <div>Starting Date:</div>
                    <div>{reservation.order.startingDate}</div>
                </div>
                <div className={styles.itemsRent}>
                    <div>Starting Location:</div>
                    <div>{reservation.order.individualCar.location.city}</div>
                </div>
                <div className={styles.itemsRent}>
                    <div>Ending Date:</div>
                    <div>{reservation.order.endingDate}</div>
                </div>
                <div className={styles.itemsRent}>
                    <div>Ending Location:</div>
                    <div>{reservation.order.location.city}</div>
                </div>
                <div className={styles.itemsRent}>
                    <div>Drivers:</div>
                    {
                        reservation.order.drivers.map(d => 
                            <div>{`${d.firstName} ${d.lastName}`}</div>
                            )
                    }
                </div>
                <div className={styles.itemsRent}>
                    <div>Optional Equipment:</div>
                    {
                        reservation.order.optionalEquipments.map(e => 
                            <div>{e.name}</div>
                            )
                    }
                </div>
                <div className={styles.itemsRent}>
                    <div>Status:</div>
                    <div>{reservation.order.status}</div>
                </div>
            </div>
            <div>
                <button className='buttonGlobal'>Modify Order</button>
                <button className='buttonGlobal'>Cancel Order</button>
            </div>
        </div>
    )
}