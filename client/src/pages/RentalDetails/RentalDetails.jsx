import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { cancelReservation, userReservation } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import AlertConfirmation from '../../components/AlertConfirmation/AlertConfirmation';
import ModifyForm from './ModifyForm';
import styles from "./RentalDetails.module.css";

const getDatesInRange = (startDate, endDate) => {
    const date = new Date(startDate);
    const dates = [];
    while (date <= endDate) {
        dates.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return dates;
}

export default function RentalDetails() {

    const reservation = useSelector(state => state.userReservation);
    const dispatch = useDispatch();
    const { orderId } = useParams();
    const { getAccessTokenSilently } = useAuth0();

    const [showAlert, setShowAlert] = useState(false);
    const [showAlertOk, setShowAlertOk] = useState(false);
    const [showModify, setShowModify] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        dispatch(userReservation(getAccessTokenSilently, orderId));
    }, [dispatch, orderId]);

    function handleCancel() {
        dispatch(cancelReservation(getAccessTokenSilently, reservation?.order?.userId, orderId));
        setShowAlert(false);
        setShowAlertOk(true);
    }

    function handleMessageOk() {
        setShowAlertOk(false)
        navigate(`/`);
    }

    function handleShow() {
        setShowModify(!showModify)
    }

    const date = new Date(reservation?.order?.endingDate);

    const datePlus = ((date, num) => {
        return new Date(new Date(date.getTime()).setDate(new Date(date.getTime()).getDate() + num))
    })(date, -2)

    const amount = reservation?.order?.paymentAmount.length === 1 ?
        (Number(reservation?.order?.paymentAmount[0]) / 100) :
        (reservation?.order?.paymentAmount.reduce(
            (previousValue, currentValue) => Number(previousValue) + Number(currentValue),
            0)) / 100;

    const numberOfDatesInitial = getDatesInRange(reservation?.order?.startingDate, datePlus).length - 1;

    return (
        <div className={styles.rentDetails}>
            <div className={styles.containerRent}>
                <div className={styles.detailsRent}>DETAILS</div>
                <div className={styles.containerRent2}>
                    {
                        reservation ?
                            (
                                <table>
                                    <thead>
                                        <tr className={styles.itemsRent}>
                                            <td className={styles.itemsRent1}>Reservation Number:</td>
                                            <td className={styles.itemsRent2}>{reservation?.order?.id}</td>
                                        </tr>
                                        <tr className={styles.itemsRent}>
                                            <td className={styles.itemsRent1}>Brand Car:</td>
                                            <td className={styles.itemsRent2}>{reservation?.order?.individualCar.carModel.brand}</td>
                                        </tr>
                                        <tr className={styles.itemsRent}>
                                            <td className={styles.itemsRent1}>Model Car:</td>
                                            <td className={styles.itemsRent2}>{reservation?.order?.individualCar.carModel.model}</td>
                                        </tr>
                                        <tr className={styles.itemsRent}>
                                            <td className={styles.itemsRent1}>Starting Date:</td>
                                            <td className={styles.itemsRent2}>{reservation?.order?.startingDate}</td>
                                        </tr>
                                        <tr className={styles.itemsRent}>
                                            <td className={styles.itemsRent1}>Starting Location:</td>
                                            <td className={styles.itemsRent2}>{reservation?.order?.individualCar.location.city}</td>
                                        </tr>
                                        <tr className={styles.itemsRent}>
                                            <td className={styles.itemsRent1}>Ending Date:</td>
                                            <td className={styles.itemsRent2}>{datePlus.toDateString()}</td>
                                        </tr>
                                        <tr className={styles.itemsRent}>
                                            <td className={styles.itemsRent1}>Ending Location:</td>
                                            <td className={styles.itemsRent2}>{reservation?.order?.location.city}</td>
                                        </tr>
                                        <tr className={styles.itemsRent}>
                                            <td className={styles.itemsRent1}>Drivers:</td>
                                            <td className={styles.itemsRent4}>
                                                {
                                                    reservation?.order?.drivers.map((d, k) =>
                                                        <div key={k}>
                                                            <p className={styles.itemsRent3}>{`${d.firstName} ${d.lastName}`}</p>
                                                        </div>
                                                    )
                                                }
                                            </td>
                                        </tr>
                                        <tr className={styles.itemsRent}>
                                            <td className={styles.itemsRent1}>Optional Equipment:</td>
                                            <td className={styles.itemsRent4}>
                                                {
                                                    reservation?.order?.optionalEquipments.map((e, k) =>
                                                        <div key={k}>
                                                            <p className={styles.itemsRent3}>{e.name}</p>
                                                        </div >
                                                    )
                                                }
                                            </td>
                                        </tr>
                                        <tr className={styles.itemsRent}>
                                            <td className={styles.itemsRent1}>Payment Amount:</td>
                                            <td className={styles.itemsRent2}>{`$ ${amount}`}</td>
                                        </tr>
                                        <tr className={styles.itemsRent}>
                                            <td className={styles.itemsRent1}>Status:</td>
                                            <td className={styles.itemsRent2}>{reservation?.order?.status === 'maintenance' ? 'concluded' : reservation?.order?.status}</td>
                                        </tr>
                                    </thead>
                                </table>
                            ) :
                            <div>Loading...</div>
                    }
                </div>
            </div>
            <div hidden={showModify}>
                <div className={styles.modifyForm1}>
                    <ModifyForm status={reservation?.order?.status}
                        oldStartingDate={reservation?.order?.startingDate}
                        oldEndingDate={reservation?.order?.endingDate}
                        userId={reservation?.order?.userId}
                        ending={reservation?.order?.status === 'in use' ? datePlus : new Date()}
                        numberOfDatesInitial={numberOfDatesInitial} />
                </div>
            </div>
            <div className={styles.buttons}>
                <button disabled={reservation?.order?.status === 'canceled' ||
                    reservation?.order?.status === 'maintenance' ||
                    reservation?.order?.status === 'concluded'} className={`buttonGlobal ${styles.buttonDetail} `}
                    onClick={handleShow}>
                    Modify Dates</button>
                <button disabled={reservation?.order?.status === 'canceled' ||
                    reservation?.order?.status === 'maintenance' ||
                    reservation?.order?.status === 'concluded'}
                    className={`buttonGlobal ${styles.buttonDetail} `}
                    onClick={() => setShowAlert(true)}>
                    Cancel Order
                </button>
            </div>
            <AlertConfirmation onCancel={() => setShowAlert(false)} showAlert={showAlert} onConfirmation={handleCancel} alertText={`Are you sure you want to cancel reservation ${orderId}?`} buttonText={'Cancel'} />
            <AlertConfirmation onCancel={handleMessageOk} showAlert={showAlertOk} onConfirmation={handleMessageOk} alertText={`Reservation ${orderId} has been canceled successfully. Refound process could take between 5 to 10 days.`} buttonText={'Close'} />
        </div>
    )
}