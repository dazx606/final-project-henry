import React, { useState, useEffect } from "react";
import { deleteRentingCar, getLocationCars, getRentingCar, URL, getFilteredCars } from "../../redux/actions";
import DatePicker from 'react-date-picker'
import { useDispatch, useSelector } from "react-redux";
import LocationFilter from "../../components/LocationFilter/LocationFilter";
import Drivers from "../../components/Drivers/Drivers";
//import { URL } from "../../redux/actions";
import TermsConditions from "../../components/Terms & coditions/TermsConditions";
import styles from "./Booking.module.css";

const datePlus = (date, num) => {
    return new Date(new Date(date.getTime()).setDate(new Date(date.getTime()).getDate() + num))
}

const getDatesInRange = (startDate, endDate) => {
    const date = new Date(startDate.getTime());
    const dates = [];
    while (date <= endDate) {
        dates.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return dates;
}

const calcUnavailableInitialDays = (carNum, rents) => {
    if (carNum > rents.length) return []
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
            unavailableDays.push(new Date(key), datePlus(new Date(key), -1))
        }
    }
    return [...unavailableDays]
}

const calcMaxAvailableDate = (firstDay, unavailableDays) => {
    const lastDay = datePlus(new Date(firstDay), 365)
    const possibleDays = getDatesInRange(new Date(firstDay), lastDay)
    let i = 0
    const formattedUnavailableDates = []
    unavailableDays.forEach((el, k) => {
        if (k % 2 === 0) formattedUnavailableDates.push(el.toDateString())
    })
    while (i < possibleDays.length) {
        if (formattedUnavailableDates.includes(possibleDays[i].toDateString())) return datePlus(possibleDays[i], -1)
        i++
    }
    return lastDay
}

export default function Booking() {
    const [message, setMessage] = useState("");
    const [startingDate, setStartingDate] = useState(new Date());
    const [endingDate, setEndingDate] = useState(datePlus(new Date(), 1));
    const location = useSelector(state => state.city)
    const allLocation = useSelector(state => state.locations)
    const [endLocation, setEndLocation] = useState(location)
    const locationCarsModels = useSelector(state => state.locationCars.models)
    const [didRent, setDidRent] = useState(false)
    const carRenting = useSelector(state => state.carRenting)
    const [selectedLocationModel, setSelectedLocationModel] = useState(false)
    const [initialDisableDay, setInitialDisableDay] = useState([])
    const [maxEndingDisableDate, setMaxEndingDisableDate] = useState([])
    const [optionalEquipments, setOptionalEquipments] = useState([])
    const [drivers, setDrivers] = useState([])
    const filteredCars = useSelector(state => state.filteredCars[0])
    const [show, setShow] = useState(false);
    const [agree, setAgree] = useState(false);
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
        if (filteredCars) setInitialDisableDay(calcUnavailableInitialDays(filteredCars.individualCars, filteredCars.existingRents))
        setStartingDate(new Date())
        setEndingDate(datePlus(new Date(), 1))
        setOptionalEquipments([]);
    }, [filteredCars])

    useEffect(() => {
        setMaxEndingDisableDate([calcMaxAvailableDate(startingDate, initialDisableDay)])
    }, [startingDate, initialDisableDay])

    const handleStartingDateChange = (value) => {
        setStartingDate(value)
        setEndingDate(datePlus(value, 1))
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

    const handleRentForm = (e) => {
        e.preventDefault()
        setDidRent(true)
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
            <p>{message}</p>
        </section>
        : <div className={styles.container}>
            <section className={styles.containerForm}>
                <div className={styles.container1}>
                    <form hidden={didRent} onSubmit={handleRentForm} className={styles.rentForm}>
                        <div className={styles.title}>
                            <h3>RENTAL FORM</h3>
                        </div>
                        <div>
                            <label>Location: </label>
                            <LocationFilter />
                        </div>
                        {
                            !location && <div>Select a Location first</div>
                        }
                        <div>
                            <label>Car Model: </label>
                            <select name="Model" disabled={!location} value={`${carRenting.brand} ${carRenting.model}`} onChange={handleSelectModel}>
                                <option value="placeholder" hidden>Car Model</option>
                                {locationCarsModels && locationCarsModels.map((el, k) => <option key={k} value={el}>{el}</option>)}
                            </select>
                        </div>
                        <div className={styles.subContainerEquipment}>
                            <label>Optional Equipment:</label>
                            <div>
                                {carRenting &&
                                    carRenting.optionalEquipments?.map((el, k) =>
                                        <p key={k}>
                                            <input disabled={!selectedLocationModel}
                                                checked={optionalEquipments.includes(el.name)}
                                                onChange={handleCheck}
                                                type="checkbox" name={el.name} key={(k)}
                                            />
                                            {el.name} ({`$ ${el.price} per day`})
                                        </p>
                                    )
                                }
                            </div>
                        </div>
                        <div className={styles.calendar}>
                            <div>
                                <label>Start Date: </label>
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
                                <div>
                                    <label>End Date: </label>
                                    <DatePicker
                                        clearIcon={null}
                                        minDate={datePlus(startingDate, 1)}
                                        onChange={setEndingDate}
                                        value={endingDate}
                                        disabled={!selectedLocationModel}
                                        format="dd/MM/yyyy"
                                        maxDate={maxEndingDisableDate.length ? maxEndingDisableDate[0] : null}
                                    />
                                </div>
                            }
                        </div>
                        <Drivers drivers={drivers} setDrivers={setDrivers} />
                        <div>
                            <label>Return location: </label>
                            <select name="endLocation" value={endLocation} onChange={handleSelectEndLocation}>
                                <option value="placeholder" hidden>location...</option>
                                {allLocation.map((el, k) => <option key={k} value={el.id}>{el.city}</option>)}
                            </select>
                        </div>
                        <div className={styles.container2}>
                            <table>
                                <tr>
                                    <td className={styles.colum1}><label>Price Per Day: </label></td>
                                    <td className={styles.colum2}><span>{carRenting.pricePerDay && `$ ${carRenting.pricePerDay + sumOfOptionalPrices()}`}</span></td>
                                </tr>
                                <tr>
                                    <td className={styles.colum1}><label>Total Days: </label></td>
                                    <td className={styles.colum2}><span>{endingDate.getDate() - startingDate.getDate()}</span></td>
                                </tr>
                                <tr>
                                    <td className={styles.colum1}><label>Total Price: </label></td>
                                    <td className={styles.colum2}><span>{carRenting.pricePerDay && `$ ${((endingDate.getDate() - startingDate.getDate()) * (carRenting.pricePerDay + sumOfOptionalPrices()))}`}</span></td>
                                </tr>
                            </table>
                        </div>
                        <div className={styles.termsConditions}>
                            <input type="checkbox" onChange={checkboxHandler} />
                            <label htmlFor="agree"> I agree to <a className={styles.terms} href={TermsConditions} onClick={() => { setShow(true) }}>terms and conditions</a></label>
                            {/* <label>I have read and accept the <b>terms and conditions</b></label> */}
                        </div>
                        <div className={styles.buttonRent}>
                            <button disabled={!agree} type="submit">
                                Rent
                            </button>
                        </div>
                    </form>
                </div>
                {didRent &&
                    <div>
                        <div className={styles.total2}>
                            <table>
                                <tr>
                                    <td className={styles.colum1}><label>Price Per Day: </label></td>
                                    <td className={styles.colum2}><span>{carRenting.pricePerDay && `$ ${carRenting.pricePerDay + sumOfOptionalPrices()}`}</span></td>
                                </tr>
                                <tr>
                                    <td className={styles.colum1}><label>Total Days: </label></td>
                                    <td className={styles.colum2}><span>{endingDate.getDate() - startingDate.getDate()}</span></td>
                                </tr>
                                <tr>
                                    <td className={styles.colum1}><label>Total Price: </label></td>
                                    <td className={styles.colum2}><span>{carRenting.pricePerDay && `$ ${((endingDate.getDate() - startingDate.getDate()) * (carRenting.pricePerDay + sumOfOptionalPrices()))}`}</span></td>
                                </tr>
                            </table>
                        </div>
                        <div className={styles.buttons}>
                            <div>
                                <button type="submit">
                                    Pay at Office
                                </button>
                            </div>
                            <form action={`${URL}create-checkout-session`} method="POST">
                                <div>
                                    <button type="submit">
                                        Pay Now
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>}
                <TermsConditions show={show} onClose={() => setShow(false)} />
            </section>
        </div>
}