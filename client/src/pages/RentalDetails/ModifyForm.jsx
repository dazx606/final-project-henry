import React, { useEffect, useState } from "react";
import DatePicker from 'react-date-picker';
import { useSelector, useDispatch } from "react-redux";
import { userReservation } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import { modifyReservation } from "../../services/services";

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

const calcUnavailableInitialDays = (carNum, rents) => {
    if (carNum > rents.length) return [[], []]
    let unavailableDaysPlusExtra = []
    let unavailableDays = []
    let days = {}
    rents.forEach(car => {
        car.forEach(({ startingDate, endingDate }) => {
            const range = getDatesInRange(new Date(startingDate), new Date(endingDate))
            range.forEach(date => {
                days[date.toDateString()] = days[date.toDateString()] ? days[date.toDateString()] + 1 : 1
            })
        })
    })

    for (let key in days) {
        if (days[key] === carNum) {
            const unavailableForAll = [new Date(key), datePlus(new Date(key), -1), datePlus(new Date(key), -2)]
            unavailableDaysPlusExtra.push(...unavailableForAll, datePlus(new Date(key), -3))
            unavailableDays.push(...unavailableForAll);
        }
    }
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

export default function Form({ status , userId}) {

    const [startingDate, setStartingDate] = useState(new Date());
    const [message, setMessage] = useState("");
    const [endingDate, setEndingDate] = useState(datePlus(new Date(), 1));
    const [unavailableDay, setUnavailableDay] = useState([]);
    const [initialDisableDay, setInitialDisableDay] = useState([]);
    const [maxEndingDisableDate, setMaxEndingDisableDate] = useState([]);
    const [validDays, setValidDays] = useState(true);
    const filteredCars = useSelector((state) => state.filteredCars[0]);
    const { orderId } = useParams();
    const { getAccessTokenSilently } = useAuth0();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userReservation(getAccessTokenSilently, orderId));
    }, [dispatch, orderId]);

    useEffect(() => {
        setStartingDate(new Date());
        setEndingDate(datePlus(new Date(), 1));
        if (filteredCars) {
            const unailebleDays = calcUnavailableInitialDays(filteredCars.individualCars, filteredCars.existingRents)
            setInitialDisableDay(unailebleDays[0]);
            setUnavailableDay(unailebleDays[1]);
            if (checkInvalidDate(new Date(), unailebleDays[0]) || checkInvalidDate(datePlus(new Date(), 1), unailebleDays[1])) {
                setValidDays(false);
            } else setValidDays(true);
        };
    }, [filteredCars])

    useEffect(() => {
        setMaxEndingDisableDate([calcMaxAvailableDate(startingDate, unavailableDay)]);
    }, [startingDate, unavailableDay])

    useEffect(() => {
        if (filteredCars) {
            const unailebleDays = calcUnavailableInitialDays(filteredCars.individualCars, filteredCars.existingRents);
            if (checkInvalidDate(startingDate, unailebleDays[0]) || checkInvalidDate(endingDate, unailebleDays[1])) {
                setValidDays(false);
            } else setValidDays(true);
        }
    }, [startingDate, endingDate, filteredCars])

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
    
    // const body = {
    //     startingDate: startingDate.toDateString(),
    //     endingDate: endingDate.toDateString(),
    //     userId: userId,
    //     rentId: orderId
    // }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(modifyReservation(startingDate.toDateString(), endingDate.toDateString(), userId, orderId, getAccessTokenSilently))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
            {
                status === 'pending' ?
                    (
                        <div>
                            <div>
                                <label>Start Date: </label>
                                <DatePicker
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
                                <div>
                                    <label>End Date: </label>
                                    <DatePicker
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
                                clearIcon={null}
                                minDate={datePlus(startingDate, 1)}
                                onChange={setEndingDate}
                                value={endingDate}
                                format="dd/MM/yyyy"
                                maxDate={maxEndingDisableDate.length && datePlus(startingDate, 1) <= maxEndingDisableDate[0] ? maxEndingDisableDate[0] : null}
                            />
                        </div>
                    )
            }
            <button type="submit">Modify</button>
            </form>
        </div>
    )

}