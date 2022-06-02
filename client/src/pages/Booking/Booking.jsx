import React, { useState, useEffect } from "react";
import { deleteRentingCar, getLocationCars, getRentingCar, URL, getFilteredCars } from "../../redux/actions";
import DatePicker from 'react-date-picker'
import { useDispatch, useSelector } from "react-redux";
import LocationFilter from "../../components/LocationFilter/LocationFilter";
import Drivers from "../../components/Drivers/Drivers";
// import styles from "./Booking.module.css";

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
    console.log(formattedUnavailableDates)
    while (i < possibleDays.length) {
        if (formattedUnavailableDates.includes(possibleDays[i].toDateString())) return datePlus(possibleDays[i], -1)
        i++
    }
    return lastDay
}

const formData = {
    location: "",
    carModel: "",
    optionalEquipments: [],
    startingDate: "",
    endingDate: "",
    totalPrice: "",
    totalDays: ""
}

export default function Booking() {
    const [message, setMessage] = useState("");
    const [startingDate, setStartingDate] = useState(new Date());
    const [endingDate, setEndingDate] = useState(datePlus(new Date(), 1));
    const location = useSelector(state => state.city)
    const locationCarsModels = useSelector(state => state.locationCars.models)
    const [didRent, setDidRent] = useState(false)
    const carRenting = useSelector(state => state.carRenting)
    const [selectedLocationModel, setSelectedLocationModel] = useState(false)
    const [initialDisableDay, setInitialDisableDay] = useState([])
    const [maxEndingDisableDate, setMaxEndingDisableDate] = useState([])
    const [dataToSend, setDataToSend] = useState(formData)
    const [drivers, setDrivers] = useState([])
    const filteredCars = useSelector(state => state.filteredCars[0])
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
    }, [filteredCars])

    useEffect(() => {
        setMaxEndingDisableDate([calcMaxAvailableDate(startingDate, initialDisableDay)])
    }, [startingDate, initialDisableDay])

    const handleStartingDateChange = (value) => {
        setStartingDate(value)
        setEndingDate(datePlus(value, 1))
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

    const handleCheck = (e) => {
        if (e.target.checked) {
            setDataToSend({
                ...dataToSend,
                optionalEquipments: [...dataToSend.optionalEquipments, e.target.name]
            })
        }
        else {
            setDataToSend({
                ...dataToSend,
                optionalEquipments: [...dataToSend.optionalEquipments.filter(el => el !== e.target.name)]
            })
        }
    }

    const sumOfOptionalPrices = () => {
        return carRenting.optionalEquipments?.filter(
            el => dataToSend.optionalEquipments.find(
                ele => ele === el.name)).reduce(
                    (prev, current) => prev + current.price, 0)
    }

    return message ?
        <section>
            <p>{message}</p>
        </section>
        : <section>
            <form hidden={didRent} onSubmit={handleRentForm}>
                <div>
                    <label>Location</label>
                    <LocationFilter />
                </div>
                {
                    !location && <div>Select a Location first</div>
                }
                <div>
                    <label>Car Model</label>
                    <select name="Model" disabled={!location} value={`${carRenting.brand} ${carRenting.model}`} onChange={handleSelectModel}>
                        <option value="placeholder" hidden>Car Model</option>
                        {locationCarsModels && locationCarsModels.map((el, k) => <option key={k} value={el}>{el}</option>)}
                    </select>
                </div>
                <div>
                    <label>Optional Equipment</label>
                    {carRenting &&
                        carRenting.optionalEquipments?.map((el, k) =>
                            <label key={k}>
                                <input disabled={!selectedLocationModel}
                                    checked={dataToSend.optionalEquipments.includes(el.name)}
                                    onChange={handleCheck}
                                    type="checkbox" name={el.name} key={(k)}
                                />
                                {el.name} ({`$ ${el.price}`})
                            </label>
                        )
                    }
                </div>
                <div>
                    <label>Start Date: </label>
                    <DatePicker
                        clearIcon={null}
                        minDate={new Date()}
                        onChange={handleStartingDateChange}
                        value={startingDate}
                        disabled={!selectedLocationModel}
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
                            maxDate={maxEndingDisableDate.length ? maxEndingDisableDate[0] : null}
                        />
                    </div>
                }
                <div>
                    <Drivers drivers={drivers} setDrivers={setDrivers} />
                </div>
                <div>
                    <input type="checkbox" name="Terms" id="" />
                    <label>I have read and accept the <b>terms and conditions</b></label>
                </div>
                <div>
                    <button type="submit">
                        Rent
                    </button>
                </div>

            </form>
            <div>
                <label>Price Per Day: </label>
                <span>{carRenting.pricePerDay && `$ ${carRenting.pricePerDay + sumOfOptionalPrices()}`}</span>
            </div>
            <div>
                <label>Total Days: </label>
                <span>{endingDate.getDate() - startingDate.getDate()}</span>
            </div>
            <div>
                <label>Total Price: </label>
                <span>{carRenting.pricePerDay && `$ ${((endingDate.getDate() - startingDate.getDate()) * (carRenting.pricePerDay + sumOfOptionalPrices()))}`}</span>
            </div>
            {didRent &&
                <div>
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
                </div>}
        </section>
}