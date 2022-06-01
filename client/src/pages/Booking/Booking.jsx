import React, { useState, useEffect } from "react";
import { getLocationCars, URL } from "../../redux/actions";
import DatePicker from 'react-date-picker'
import { useDispatch, useSelector } from "react-redux";
import LocationFilter from "../../components/LocationFilter/LocationFilter";
// import styles from "./Booking.module.css";

export default function Booking() {
    const [message, setMessage] = useState("");
    const [startingDate, setStartingDate] = useState(new Date());
    const [endingDate, setEndingDate] = useState(new Date(new Date(new Date()).setDate(new Date(new Date()).getDate() + 1)));
    const location = useSelector(state => state.city)
    const locationCarsModels = useSelector(state => state.locationCars.models)
    const [model, setModel] = useState("")
    const [didRent, setDidRent] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (location) dispatch(getLocationCars(location))
    }, [dispatch, location])

    const datePlusOne = (date) => {
        return new Date(new Date(date.getTime()).setDate(new Date(date.getTime()).getDate() + 1))
    }

    const handleStartingDateChange = (value) => {
        const newDate = value
        setStartingDate(newDate)
        setEndingDate(datePlusOne(newDate))
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

    return message ? (
        <section>
            <p>{message}</p>
        </section>
    ) : (
        <section>
            <form onSubmit= {handleRentForm}>
                <div>
                    <label>Location</label>
                    <LocationFilter />
                </div>
                <div>
                    <label>Car Model</label>
                    <select name="Model" >
                        <option value="placeholder" hidden>Car Model</option>
                        {locationCarsModels && locationCarsModels.map((el, k) => <option key={k} value={el}>{el}</option>)}
                    </select>
                </div>
                <div>
                    <label>Optional Equipment</label>
                    <input type="text" name="optEquipment"></input>
                </div>
                <div>
                    <label>Start Date: </label>
                    <DatePicker clearIcon={null} minDate={new Date()} onChange={handleStartingDateChange} value={startingDate} />
                </div>
                {
                    <div>
                        <label>End Date: </label>
                        <DatePicker clearIcon={null} minDate={datePlusOne(startingDate)} onChange={setEndingDate} value={endingDate} />
                    </div>
                }
                <div>
                    <label>Price: </label>
                    <span>20.00</span>
                </div>
                <div>
                    <label>Total Days: </label>
                    <span>4</span>
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
            {didRent && <div><div>
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
            </form></div>}
        </section>
    );
}