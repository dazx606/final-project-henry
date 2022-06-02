import React, { useState, useEffect } from "react";
import { URL } from "../../redux/actions";
import TermsConditions from "../../components/Terms & coditions/TermsConditions";
// import styles from "./Booking.module.css";

export default function Booking() {
    const [message, setMessage] = useState("");
    const [show, setShow] = useState(false);
    const [agree, setAgree] = useState(false);

    const checkboxHandler = () => {
        setAgree(!agree);
      }

    return (
        <div>
            <div>
                <div>
                    <input type="checkbox" onChange={checkboxHandler} />
                    <label htmlFor="agree"> I agree to <a href={TermsConditions} onClick={() => { setShow(true) }}>terms and conditions</a></label>
                </div>
                <button disabled={!agree}>
                    Continue
                </button>
            </div>
            <TermsConditions show={show} onClose={() => setShow(false)} />
        </div>
    )

    // useEffect(() => {
    //     // Check to see if this is a redirect back from Checkout
    //     const query = new URLSearchParams(window.location.search);

    //     if (query.get("success")) {
    //         setMessage("Order placed! You will receive an email confirmation.");
    //     }

    //     if (query.get("canceled")) {
    //         setMessage(
    //             "Order canceled -- continue to shop around and checkout when you're ready."
    //         );
    //     }
    // }, []);

    // return message ? (
    //     <section>
    //         <p>{message}</p>
    //     </section>
    // ) : (
    //     <section>
    //         <div className="product">
    //             <img
    //                 src="https://i.imgur.com/EHyR2nP.png"
    //                 alt="The cover of Stubborn Attachments"
    //             />
    //             <div className="description">
    //                 <h3>Stubborn Attachments</h3>
    //                 <h5>$20.00</h5>
    //             </div>
    //         </div>
    //         <form action={`${URL}create-checkout-session`} method="POST">
    //             <button type="submit">
    //                 Checkout
    //             </button>
    //         </form>
    //     </section>
    // );
}