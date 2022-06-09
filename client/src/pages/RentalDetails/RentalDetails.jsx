import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { cancelReservation, userReservation } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import AlertConfirmation from '../../components/AlertConfirmation/AlertConfirmation';
import styles from "./RentalDetails.module.css";

export default function RentalDetails({ match }) {

    const reservation = useSelector(state => state.userReservation);
    const dispatch = useDispatch();
    const { orderId } = useParams();
    const { getAccessTokenSilently } = useAuth0();
    // const [cancelOrder, setCancelOrder] = useState({ userId: '', rentId: '' });
    // const [message, setMessage] = useState("");
    // const [alert, setAlert] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertOk, setShowAlertOk] = useState(false)
    const navigate = useNavigate();


    useEffect(() => {
        dispatch(userReservation(getAccessTokenSilently, orderId));
    }, [dispatch, getAccessTokenSilently, orderId]);

    function handleCancel() {
        dispatch(cancelReservation(getAccessTokenSilently, reservation.order?.userId, orderId));
        // setAlert(false);
        setShowAlert(false);
        setShowAlertOk(true);
    }

    function handleMessageOk() {
        setShowAlertOk(false)
        navigate(`/profile/${reservation.order?.userId}`);
    }

    const date = new Date(reservation.order?.endingDate);

    const datePlus = ((date, num) => {
        return new Date(new Date(date.getTime()).setDate(new Date(date.getTime()).getDate() + num))
    })(date, -2)



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
                                            <td className={styles.itemsRent2}>{datePlus.toDateString()}</td>
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
                                                            <td className={styles.itemsRent3}>{`${d.firstName} ${d.lastName}`}</td>
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
                                                            <td className={styles.itemsRent3}>{e.name}</td>
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
                                            <td className={styles.itemsRent2}>{reservation.order?.status === 'maintenance' ? 'concluded' : reservation.order?.status}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            ) :
                            <div>Loading...</div>
                    }
                </div>
            </div>
            <div className={styles.buttons}>
                <button disabled={reservation.order?.status !== 'pending' || reservation.order?.status !== 'in use'} className='buttonGlobal'>Modify Dates</button>
                <button disabled={reservation.order?.status === 'canceled' ||
                    reservation.order?.status === 'maintenance' ||
                    reservation.order?.status === 'concluded'}
                    className='buttonGlobal'
                    onClick={() => setShowAlert(true)}>
                    Cancel Order
                </button>
            </div>
            <AlertConfirmation onCancel={() => setShowAlert(false)} showAlert={showAlert} onConfirmation={handleCancel} alertText={`Are you sure you want to cancel reservation ${orderId}?`} buttonText={'Cancel'} />
            <AlertConfirmation onCancel={handleMessageOk} showAlert={showAlertOk} onConfirmation={handleMessageOk} alertText={`Reservation ${orderId} has been canceled successfully`} buttonText={'Close'} />
        </div>
    )
}

function Form() {
    return (
        <div>Modify date</div>
    )

}