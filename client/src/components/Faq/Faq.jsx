import React from "react";
import { NavLink } from "react-router-dom";



export default function Faq() {
    return (
        <div>
            <h1>FAQ</h1>

            <h2>How Can I Pay For The Service?</h2>
            <p>You can pay the rent in cash, credit or debit card; For the security deposit we ask for a credit card.</p>
            <h2>What If I Need To Keep The Car A Bit Longer Than The Agreed Date And Time?</h2>
            <p>No Problem, let us know about your new plans. We will gladly help you.</p>
            <h2>Does My Child Have To Use A Car Seat?</h2>
            <p>Buenos aires Law requires that all children should stay in a booster seat until they are taller than 4 feet 9 inches and weigh more than 80 pounds. By general rule, the age to stop using a car seat is 6 years old. Rent a car won’t rent you a car if you don’t have a proper car seat while transporting children 5 years or younger.</p>
            <h2>Will I Receive A Confirmation Of My Online Reservation?</h2>
            <p>Yes! After submitting your request, you will receive an email with your reservation details and Pick Up instructions.</p>
            <h2>Can I Add An Additional Driver?</h2>
            <p>Yes, you can add up to 2 additional drivers. Each additional driver has to comply with the same condition as the primary driver. A fee will apply for adding each additional driver.</p>
            <h2>What Personal Identification I Have To Bring In Order To Rent A Car?</h2>
            <p>Each driver has to bring a valid Driver’s License. Non US Drivers must bring a second form of ID, Such as a Passport or a valid government issued ID. An International Driver License is necessary if the original Driver’s License is printed in non-Roman alphabet (such as Chinese, arabic, Cyrillic, etc.)</p>


            <NavLink to='/'>Go to Home</NavLink>

        </div>

    )



}