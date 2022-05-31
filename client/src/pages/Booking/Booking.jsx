import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { URL } from "../../redux/actions";

import Checkout from "../../components/Checkout/Checkout";
// import styles from "./Booking.module.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const STRIPE_KEY = process.env.REACT_APP_PUBLIC_STRIPE_KEY;
const stripePromise = loadStripe(STRIPE_KEY);

export default function Booking() {
    const [clientSecret, setClientSecret] = useState("");
    const [payment, setPayment] = useState(false);

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch(`${URL}create-payment-intent`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div >

            <input type="button" value="Pay now" onClick={() => setPayment(!payment)} />
            {payment && clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <Checkout />
                </Elements>
            )}
        </div>
    );
}