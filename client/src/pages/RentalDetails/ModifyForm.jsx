import React, { useEffect, useState } from "react";
import DatePicker from 'react-date-picker';
import { useSelector, useDispatch } from "react-redux";
import { userReservation, findUnavailableDays } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams, useNavigate } from "react-router-dom";
import { modifyReservation } from "../../services/services";
import styles from "./ModifyForm.module.css";
import AlertConfirmation from '../../components/AlertConfirmation/AlertConfirmation';

const datePlus = (date, num) => {
    return new Date(new Date(date.getTime()).setDate(new Date(date.getTime()).getDate() + num))
}

const getDatesInRange = (startDate, endDate) => {
    const date = new Date(startDate.toDateString());
    const dates = [];
    while (date <= endDate) {
        dates.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return dates;
}

const calcUnavailableInitialDays = (unavailableDaysFromBack) => {
    let unavailableDaysPlusExtra = []
    let unavailableDays = []
    let dayRanges = []

    unavailableDaysFromBack.forEach(({ startingDate, endingDate }) => {
        const range = getDatesInRange(new Date(startingDate), new Date(endingDate));
        dayRanges.push(...range);
    })

    dayRanges.forEach(day => {
        const unavailableForAll = [day, datePlus(day, -1), datePlus(day, -2)]
        unavailableDaysPlusExtra.push(...unavailableForAll, datePlus(day, -3))
        unavailableDays.push(...unavailableForAll);
    })

    return [unavailableDaysPlusExtra, unavailableDays]
}

const calcMaxAvailableDate = (firstDay, unavailableDays) => {
    const lastDay = datePlus(new Date(firstDay), 365)
    const possibleDays = getDatesInRange(new Date(firstDay), lastDay)
    let i = 0
    const formattedUnavailableDates = []
    unavailableDays.forEach(el => {
        formattedUnavailableDates.push(el.toDateString())
    })
    while (i < possibleDays.length) {
        if (formattedUnavailableDates.includes(possibleDays[i].toDateString())) return datePlus(possibleDays[i], -1)
        i++
    }
    return lastDay
}

const checkInvalidDate = (day, array) => {
    day = day.toDateString();
    return array.some(d => d.toDateString() === day);
}

export default function Form({ status, userId, ending, numberOfDatesInitial, oldStartingDate, oldEndingDate }) {

    // const endingValid = ending ? ending : new Date();

    const [startingDate, setStartingDate] = useState(new Date());
    const [message, setMessage] = useState("");
    const [endingDate, setEndingDate] = useState(datePlus(new Date(), 1));
    const [unavailableDay, setUnavailableDay] = useState([]);
    const [initialDisableDay, setInitialDisableDay] = useState([]);
    const [maxEndingDisableDate, setMaxEndingDisableDate] = useState([]);
    const [validDays, setValidDays] = useState(true);
    const unavailableDaysFromBack = useSelector((state) => state.unavailableDays);
    const { orderId } = useParams();
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertOk, setShowAlertOk] = useState(false);
    const { getAccessTokenSilently } = useAuth0();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(userReservation(getAccessTokenSilently, orderId));
        dispatch(findUnavailableDays(getAccessTokenSilently, orderId));
    }, [dispatch, orderId]);

    useEffect(() => {
        if (oldStartingDate) setStartingDate(new Date(oldStartingDate));
        if (oldEndingDate) setEndingDate(datePlus(new Date(oldEndingDate), -2));
    }, [oldStartingDate, oldEndingDate]);

    useEffect(() => {
        // setStartingDate(new Date());
        // setEndingDate(datePlus(new Date(), 1));
        if (unavailableDaysFromBack) {
            const unailebleDays = calcUnavailableInitialDays(unavailableDaysFromBack)
            setInitialDisableDay(unailebleDays[0]);
            setUnavailableDay(unailebleDays[1]);
            if (checkInvalidDate(new Date(), unailebleDays[0]) || checkInvalidDate(datePlus(new Date(), 1), unailebleDays[1])) {
                setValidDays(false);
            } else setValidDays(true);
        };
    }, [unavailableDaysFromBack])

    useEffect(() => {
        setMaxEndingDisableDate([calcMaxAvailableDate(startingDate, unavailableDay)]);
    }, [startingDate, unavailableDay])

    useEffect(() => {
        if (unavailableDaysFromBack) {
            const unailebleDays = calcUnavailableInitialDays(unavailableDaysFromBack);
            if (checkInvalidDate(startingDate, unailebleDays[0]) || checkInvalidDate(endingDate, unailebleDays[1])) {
                setValidDays(false);
            } else setValidDays(true);
        }
    }, [startingDate, endingDate, unavailableDaysFromBack])

    const handleStartingDateChange = (value) => {
        setStartingDate(value);
        setEndingDate(datePlus(value, 1));
    }

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);

        if (query.get("success")) {
            setMessage("Order placed! You will receive an email confirmation.");
        }

        if (query.get("canceled")) {
            setMessage(
                "Order canceled -- continue to shop around and checkout when you're ready."
            );
        }
    }, []);

    // const numberOfDatesInicial = getDatesInRange(sDate, eDate).length - 1;
    const numberOfDatesModified = getDatesInRange(startingDate, endingDate).length - 1;

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(modifyReservation(startingDate.toDateString(), endingDate.toDateString(), userId, orderId, getAccessTokenSilently))
        dispatch(userReservation(getAccessTokenSilently, orderId));
        setShowAlert(false)
        if (numberOfDatesModified < numberOfDatesInitial) {
            setShowAlertOk(true)
        }
    }

    function handleMessageOk() {
        setShowAlertOk(false)
        navigate(`/profile/${userId}`);
    }

    return (
        <div className={styles.modifyForm}>
            <form>
                {
                    status === 'pending' ?
                        (
                            <div className={styles.calendar}>
                                <div className={styles.startingCalendar}>
                                    <label>Start Date: </label>
                                    <DatePicker
                                        className={styles.date}
                                        clearIcon={null}
                                        minDate={new Date()}
                                        onChange={handleStartingDateChange}
                                        value={startingDate}
                                        disabled={status !== 'pending'}
                                        format="dd/MM/yyyy"
                                        tileDisabled={({ date, view }) =>
                                            (view === 'month') &&
                                            initialDisableDay.some(disabledDate =>
                                                date.getFullYear() === disabledDate.getFullYear() &&
                                                date.getMonth() === disabledDate.getMonth() &&
                                                date.getDate() === disabledDate.getDate()
                                            )
                                        }
                                    />
                                </div>
                                {
                                    <div className={styles.endingCalendar}>
                                        <label>End Date: </label>
                                        <DatePicker
                                            className={styles.date}
                                            clearIcon={null}
                                            minDate={datePlus(startingDate, 1)}
                                            onChange={setEndingDate}
                                            value={endingDate}
                                            format="dd/MM/yyyy"
                                            maxDate={maxEndingDisableDate.length && datePlus(startingDate, 1) <= maxEndingDisableDate[0] ? maxEndingDisableDate[0] : null}
                                        />
                                    </div>
                                }
                                {!validDays && <p>Invalid dates</p>}
                            </div>
                        ) :
                        (
                            <div>
                                <label>End Date: </label>
                                <DatePicker
                                    className={styles.date}
                                    clearIcon={null}
                                    minDate={ending}
                                    onChange={setEndingDate}
                                    value={endingDate}
                                    format="dd/MM/yyyy"
                                    maxDate={maxEndingDisableDate.length && datePlus(startingDate, 1) <= maxEndingDisableDate[0] ? maxEndingDisableDate[0] : null}
                                />
                            </div>
                        )
                }
                <div className={styles.buttonContainer}>
                    <input className="buttonGlobal" type="button" value='Modify' onClick={() => setShowAlert(true)} />
                </div>
                <AlertConfirmation
                    onCancel={() => setShowAlert(false)}
                    showAlert={showAlert}
                    onConfirmation={handleSubmit}
                    alertText={`Are you sure you want to modify reservation ${orderId}? Remember that in case of refound it could take between 5 to 10 days.`}
                    buttonText={'Confirm'} />
                <AlertConfirmation
                    onCancel={handleMessageOk}
                    showAlert={showAlertOk}
                    onConfirmation={handleMessageOk}
                    alertText={`Reservation ${orderId} has been modified successfully. Check back later to see the status of your reservation.`} buttonText={'Close'} />
            </form>
        </div>
    )

}