import React, { useEffect, useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import styles from "./Checkout.module.css";

export default function Checkout() {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState({ mail: "", error: "" });

    useEffect(() => {
        if (!stripe) return

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) return

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            console.log(paymentIntent);
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: "http://localhost:3000/booking",
                receipt_email: email.mail,
            },
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occured.");
        }

        setIsLoading(false);
    };


    const handleEmailChange = (e) => {
        let newEmail = { mail: e.target.value, error: "" };
        if (!e.target.value) {
            newEmail.error = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(e.target.value)) {
            newEmail.error = 'You have entered an invalid email address!';
        }
        setEmail(newEmail);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                id="email"
                type="text"
                value={email.mail}
                onChange={handleEmailChange}
                placeholder="Enter billing email address"
            // reemplazar el palceholder por el email del usuario
            />
            {email.error && <div>{email.error}</div>}
            <PaymentElement />
            <button disabled={isLoading || !stripe || !elements || !email.mail || email.error} >
                <span >
                    {isLoading ? <div>Loading</div> : "Pay now"}
                </span>
            </button>
            {message && !message === "succeeded" && <div>{message}</div>}
        </form>
    );
}