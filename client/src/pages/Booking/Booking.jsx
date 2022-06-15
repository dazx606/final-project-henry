import React, { useState, useEffect } from "react";
import { deleteRentingCar, getLocationCars, getRentingCar, URL, getFilteredCars } from "../../redux/actions";
import { rentCar } from "../../services/services";
import DatePicker from 'react-date-picker'
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import LocationFilter from "../../components/LocationFilter/LocationFilter";
import Drivers from "../../components/Drivers/Drivers";
//import { URL } from "../../redux/actions";
import TermsConditions from "../../components/Terms & coditions/TermsConditions";
import styles from "./Booking.module.css";

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

export default function Booking() {
    const [message, setMessage] = useState("");
    const [startingDate, setStartingDate] = useState(new Date());
    const [endingDate, setEndingDate] = useState(datePlus(new Date(), 1));
    const [unavailableDay, setUnavailableDay] = useState([])
    const location = useSelector(state => state.city)
    const allLocation = useSelector(state => state.locations)
    const [endLocation, setEndLocation] = useState(location)
    const locationCarsModels = useSelector(state => state.locationCars.models)
    const carRenting = useSelector(state => state.carRenting)
    const [selectedLocationModel, setSelectedLocationModel] = useState(false)
    const [initialDisableDay, setInitialDisableDay] = useState([])
    const [maxEndingDisableDate, setMaxEndingDisableDate] = useState([])
    const [optionalEquipments, setOptionalEquipments] = useState([])
    const [drivers, setDrivers] = useState([])
    const filteredCars = useSelector(state => state.filteredCars[0])
    const [show, setShow] = useState(false);
    const [agree, setAgree] = useState(false);
    const userId = useSelector(state => state.user.data?.id)
    const [validDays, setValidDays] = useState(true)
    const [loading, setLoading] = useState(false)
    const userDriver = useSelector(state => state.user)
    const { getAccessTokenSilently } = useAuth0();
    const dispatch = useDispatch()

    useEffect(() => {
        if (location) dispatch(getLocationCars(location))
        return () => dispatch(deleteRentingCar())
    }, [dispatch, location])

    useEffect(() => {
        if (location && Object.keys(carRenting).length) setSelectedLocationModel(true)
        else setSelectedLocationModel(false)
    }, [location, carRenting])

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
        }
        setOptionalEquipments([]);
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
    }, [startingDate, endingDate])

    const handleStartingDateChange = (value) => {
        setStartingDate(value);
        setEndingDate(datePlus(value, 1));
    }

    const checkboxHandler = () => {
        setAgree(!agree);
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

    useEffect(() => {
        if (userDriver.data && userDriver.data.firstName && userDriver.data.lastName && userDriver.data.license && userDriver.data.documentId) {
            setDrivers([{
                firstName: userDriver.data.firstName,
                lastName: userDriver.data.lastName,
                licenseNumber: userDriver.data.license,
                documentId: userDriver.data.documentId
            }])
        }
    }, [setDrivers, userDriver])

    const handleRentForm = (e) => {
        e.preventDefault();
        setLoading(true);
        dispatch(rentCar(location, carRenting.model, startingDate.toDateString(), endingDate.toDateString(), optionalEquipments, drivers, endLocation, userId, getAccessTokenSilently))
    }

    const handleSelectModel = (e) => {
        const model = e.target.value.split(" ").slice(1).join(" ")
        const brand = e.target.value.split(" ")[0]
        dispatch(getRentingCar(model))
        dispatch(getFilteredCars({ brand: brand, carsPerPage: 0, model: model }, location))
    }

    const handleSelectEndLocation = (e) => {
        setEndLocation(e.target.value)
    }

    const handleCheck = (e) => {
        if (e.target.checked) {
            setOptionalEquipments([...optionalEquipments, e.target.name])
        }
        else {
            setOptionalEquipments(optionalEquipments.filter(el => el !== e.target.name))
        }
    }

    const sumOfOptionalPrices = () => {
        return carRenting.optionalEquipments?.filter(
            el => optionalEquipments.find(
                ele => ele === el.name)).reduce(
                    (prev, current) => prev + current.price, 0)
    }

    return message ?
        <section>
            <div className={styles.warningContainer}>
                <div className={styles.warningImg}>
                    <i className={`fa-solid fa-car ${styles.warningIcon}`}></i>
                </div>
                <div className={styles.warningText}>
                    <p className={styles.warning2}>Order canceled. Payment incomplete.</p>
                </div>
            </div>
        </section>
        : <div className={`boxGlobal ${styles.container}`}>
            <form onSubmit={handleRentForm} className={styles.rentForm}>
                <div className={styles.title}>
                    <h3>RENTAL FORM</h3>
                </div>
                <div className={styles.locationContainer}>
                    <label className={styles.tag} >Location: </label>
                    <div className={styles.locationBox}><LocationFilter /></div>
                </div>

                {
                    !location && <div className={styles.error}>Select a Location first</div>
                }

                <div className={styles.selectBox}>
                    <label className={styles.tag}>Car Model:  </label>
                    <select className={`selectGlobal ${styles.selects}`} name="Model" disabled={!location} value={`${carRenting.brand} ${carRenting.model}`} onChange={handleSelectModel}>
                        <option value="placeholder" hidden>Car Model</option>
                        {locationCarsModels && locationCarsModels.map((el, k) => <option key={k} value={el}>{el}</option>)}
                    </select>
                </div>
                <div className={`boxGlobal ${styles.subContainerEquipment}`}>
                    <label className={styles.tagN}>Optional Equipment:</label>
                    <div>
                        {carRenting &&
                            carRenting.optionalEquipments?.map((el, k) =>
                                <p key={k}>
                                    <input disabled={!selectedLocationModel}
                                        checked={optionalEquipments.includes(el.name)}
                                        onChange={handleCheck}
                                        type="checkbox" name={el.name} key={(k)}
                                    />
                                    {el.name} ({`$ ${el.price} /day`})
                                </p>
                            )
                        }
                    </div>
                </div>
                <div className={styles.calendar}>
                    <div className={styles.dateBox} >
                        <label className={styles.tagN}>Start Date: </label>
                        <DatePicker
                            className={styles.date}
                            clearIcon={null}
                            minDate={new Date()}
                            onChange={handleStartingDateChange}
                            value={startingDate}
                            disabled={!selectedLocationModel}
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
                        <div className={styles.dateBox} >
                            <label className={styles.tagN}>End Date: </label>
                            <DatePicker
                                className={styles.date}
                                clearIcon={null}
                                minDate={datePlus(startingDate, 1)}
                                onChange={setEndingDate}
                                value={endingDate}
                                disabled={!selectedLocationModel}
                                format="dd/MM/yyyy"
                                maxDate={maxEndingDisableDate.length && datePlus(startingDate, 1) <= maxEndingDisableDate[0] ? maxEndingDisableDate[0] : null}
                            />
                        </div>
                    }
                </div>
                {!validDays && <p>Invalid dates</p>}
                <Drivers drivers={drivers} setDrivers={setDrivers} />
                <div className={styles.selectBox}>
                    <label className={styles.tag}>Return location: </label>
                    <select className={`selectGlobal ${styles.selects}`} name="endLocation" value={endLocation} onChange={handleSelectEndLocation}>
                        <option value="placeholder" hidden>location...</option>
                        {allLocation.map((el, k) => <option key={k} value={el.id}>{el.city}</option>)}
                    </select>
                </div>
                <div className={styles.container2}>
                    <table>
                        <tbody>
                            <tr>
                                <td className={styles.colum1}><label className={styles.tag} >Price Per Day: </label></td>
                                <td className={styles.colum2}><span>{carRenting.pricePerDay && `$ ${carRenting.pricePerDay + sumOfOptionalPrices()}`}</span></td>
                            </tr>
                            <tr>
                                <td className={styles.colum1}><label className={styles.tag}>Total Days: </label></td>
                                <td className={styles.colum2}><span>{getDatesInRange(startingDate, endingDate).length - 1}</span></td>
                            </tr>
                            <tr>
                                <td className={styles.colum1}><label className={styles.tag}>Total Price: </label></td>
                                <td className={styles.colum2}><span>{carRenting.pricePerDay && `$ ${((getDatesInRange(startingDate, endingDate).length - 1) * (carRenting.pricePerDay + sumOfOptionalPrices()))}`}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={styles.termsConditions}>
                    <input className={styles.checkbox} type="checkbox" onChange={checkboxHandler} />
                    <label htmlFor="agree" className={styles.tag}> I agree to <a className={styles.terms} onClick={() => { setShow(true) }}>terms and conditions</a></label>
                </div>
                {!loading ?
                    <div className={styles.buttonRent}>
                        <button className="buttonGlobal" disabled={!agree || !location || !carRenting.model || !drivers.length || !endLocation || !validDays} type="submit">
                            Rent
                        </button>
                    </div>
                    : <p>Loading...</p>
                }

            </form>
            <TermsConditions show={show} onClose={() => setShow(false)} />

        </div>
}