import React from "react";
import styles from "./TermsConditions.module.css";

export default function TermsConditions ({show, onClose}) {
    if (!show) {
        return null;
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.overlayInner}>
                <button className={styles.close} onClick={onClose}><i className="fa-solid fa-xmark"></i></button>
                <div className={styles.description}>                   
                    <div className={styles.scrollBox}>
                    <h2>TERMS AND CONDITIONS OF RENTAL AGREEMENT TO HIRE RENTAL VEHICLE</h2>
                    <p>The Rental Agreement comprises these terms and conditions and the rental document setting out the hire details which is provided with each Vehicle at the point of hire (referred to in these terms and conditions as the “Rental Document”). The Rental Agreement is made between AVR Myanmar Limited (herein referred to as “the Lessor”) and the person and/or company signing the Rental Document (herein referred to as “the Renter”) whose particulars are recorded in the Rental Document. It is hereby agreed as follows:</p>
                    
                    <h4>VEHICLE DESCRIPTION AND TERM OF HIRE</h4>
                    <p>1. The Lessor will let and the Renter will take the motor Vehicle, details of which are described in the Rental Document (herein referred to as “the Vehicle”), for the term of hire as described in the Rental Document.</p>
                    
                    <h4>PERSONS WHO MAY DRIVE THE RENTAL VEHICLE</h4>
                    <p>2. The Vehicle may be driven during the term of hire only by the persons named on the Rental Document or in a supplementary driver’s sheet attached to the Rental Agreement, and only if they hold a current full valid driver’s license appropriate for the Vehicle while they are using the Vehicle.</p>
                    
                    <h4>PAYMENTS BY RENTER</h4>
                    <p>3. The Renter shall pay the Lessor for the hire of the Vehicle the sum or sums specified in the Rental Document; and authorizes the Lessor to charge all amounts payable to the Renter’s account. The Renter’s account means a nominated debit card, credit card, or pre-arranged charge account.</p>
                    <p>4. In addition to the payment specified in clause 3 above, the Renter acknowledges that they shall be liable at the end of the hire term to pay to the Lessor any applicable additional charges payable at the end of the term. These include, but are not limited to:</p>
                    <p>a- a fee to cover additional drivers;</p>
                    <p>b- a surcharge for drivers under the age of 25;</p>
                    <p>c- additional charges for distance driven (as specified in the Rental Document for every kilometre run);</p>
                    <p>d- charges for petrol or other fuel used (but not oil);</p>
                    <p>e- road user charges;</p>
                    <p>f- charges for late return of the Vehicle;</p>
                    <p>g- charges for damage to or repair of the Vehicle (subject to the other terms of the Rental Agreement); and any enforcement charges relating to such damage or repairs (including legal costs). The Renter shall bear the USD 200 deductible for any damages and repair unless the Renter has purchased the additional coverage;</p>
                    <p>h- charges for cleaning the Vehicle’s interior if the Vehicle is returned in an excessively dirty condition that requires extra cleaning or deodorizing. This includes, but is not limited to, spillage of fluids, food, vomit, other stains, and unpleasant odours including cigarette smoke;</p>
                    <p>i- traffic and/or parking offence infringement fees;</p>
                    <p>j- the administration fees as specified in the Rental Agreement; and</p>
                    <p>k- any surcharges in connection with the use of a debit or credit card by the Renter.</p>
                    <p>5. The Lessor will charge the amounts set out in clauses 3 and 4 above to the Renter’s account during or after the term of hire is completed, or the Renter may pay such charges as agreed with the Lessor, such choice to be at the Lessor’s sole discretion.</p>
                    <p>6. If the Renter fails to pay any money due under or in connection with the Rental Agreement within 14 days of the date by which the Renter was required to pay the money, the Lessor may, without prejudice to any other rights or remedies the Lessor may have or be entitled to, charge the Renter and the Renter must pay all additional costs as outlined below:</p>
                    <p>(a) penalty charge at 10% (compounded daily) on the total amount owing from the expiry of 14 days from the date on which the Renter was required to pay the money to the date of payment;</p>
                    <p>(b) all costs incurred by the Lessor for the collection of the unpaid money by a debt collection agency or other external or legal agency; and</p>
                    <p>(c) an administration fee of USD 50 plus commercial tax.</p>
                    
                    <h4>USE OF THE VEHICLE</h4>
                    <p>7. The Renter shall not:</p>
                    <p>a- use or allow the Vehicle to be used for the transport of passengers for hire or reward unless the Vehicle is hired with the Lessor’s knowledge for use in a passenger service;</p>
                    <p>b- sublet or hire the Vehicle to any other person;</p>
                    <p>c- allow the Vehicle to be used outside his/her authority;</p>
                    <p>d- operate the Vehicle or allow it to be operated in circumstances that constitute an offence against the law (which relates to driving under the influence of alcohol or drugs);</p>
                    <p>e- operate the Vehicle or allow it to be operated in any race, speed test, reliability trial, rally or contest, or operated on any race or rally circuit or in any event as a pace-maker or testing in preparation for any of them;</p>
                    <p>f- operate the Vehicle, or allow it to be operated, in breach of rules and regulations or bylaws relating to road traffic;</p>
                    <p>g- operate the Vehicle or allow it to be operated for the transport of more passengers or goods than the maximum specified in the certificate of loading and/or road user charge certificate, whichever is the lesser, for the Vehicle;</p>
                    <p>h- drive or allow the Vehicle to be driven by any person if at the time of driving the Vehicle the driver does not hold a current full valid driver’s license appropriate for the Vehicle;</p>
                    <p>i- drive or allow the Vehicle to be driven on any roads excluded in clause 22(q) of these terms and conditions, or on any beach, driveway, or surface likely to damage the Vehicle;</p>
                    <p>j- allow the Vehicle to be driven by any person who is not named or described in the Rental Document as a person permitted to drive the Vehicle;</p>
                    <p>k- operate the Vehicle or allow it to be operated to propel or tow any other Vehicle;</p>
                    <p>l- transport any animal in the Vehicle (with the exception of guide dogs for visually impaired people);</p>
                    <p>m- operate or allow the Vehicle to be used in involvement with any illegal activity; or</p>
                    <p>n- allow any person to smoke in the Vehicle.</p>
                    
                    <h4>RENTER’S OBLIGATIONS</h4>
                    <p>8. The Renter shall ensure that:</p>
                    <p>a- all reasonable care is taken when driving and parking the Vehicle;</p>
                    <p>b- the water in the Vehicle’s radiator and battery is maintained at the proper level;</p>
                    <p>c- the oil in the Vehicle is maintained at the proper level;</p>
                    <p>d- only the fuel type specified for the Vehicle will be used;</p>
                    <p>e- the tyres are maintained at their proper pressure;</p>
                    <p>f- the Vehicle is locked and secure at all times when it is not in use and the keys kept under the Renter’s personal control at all times;</p>
                    <p>g- the distance recorder or speedometer are not interfered with;</p>
                    <p>h- no part of the engine, transmission, braking or suspension systems are interfered with;</p>
                    <p>i- should a warning light be illuminated or the Renter believes the Vehicle requires mechanical attention, the Renter will stop driving and advise the Lessor immediately;</p>
                    <p>j- all drivers authorised to use this Vehicle during the term of hire are aware of and comply with the terms outlined in the Rental Agreement; and</p>
                    <p>k- any authorised driver carries their driver’s license with them in the Vehicle at all times and will produce it on demand to any enforcement officer.</p>
                    
                    <h4>LESSOR’S OBLIGATIONS</h4>
                    <p>9. The Lessor shall supply the Vehicle in a safe and roadworthy condition, up to current certificate of fitness standards.</p>
                    
                    <h4>MECHANICAL REPAIRS AND ACCIDENTS</h4>
                    <p>10. If the Vehicle is involved in an accident, is damaged, breaks down or requires repair or salvage, regardless of cause, the Renter shall notify the Lessor of the full circumstances by telephone immediately.</p>
                    <p>11. The Renter shall not arrange or undertake any repairs or salvage without the Lessor’s authority (this includes, but is not limited to, purchasing a replacement tyre) except to the extent that repairs or salvage are necessary to prevent further damage to the Vehicle or to other property.</p>
                    <p>12. 24 Hour Roadside Assistance is free for all inherent mechanical faults (as determined by the Lessor or its authorised repairer) related to the Vehicle specified in the Rental Document. For all other roadside assistance call outs including refueling, jump start, tyre related incidents, lost keys and keys locked in the Vehicle, a service fee will be charged.</p>
                    <p>13. If the Vehicle requires repair or replacement, the decision to supply another Vehicle to the Renter is at the Lessor’s sole discretion.</p>
                    
                    <h4>RETURN OF VEHICLE</h4>
                    <p>14. The Renter shall, at or before the expiry of the term of hire, deliver the Vehicle to the agreed rental location described in the Rental Document or obtain the Lessor’s consent to the continuation of the hire (in which case the Renter shall pay additional hire charges for the extended term of hire). If the Renter does not comply with this clause, and does not immediately return the Vehicle, the Lessor may report the Vehicle as stolen to the police and the Renter must compensate the Lessor for either the full cost of the Vehicle, or all additional costs and losses incurred up to the time that the Vehicle is recovered by the Lessor.</p>
                    
                    <h4>LIABILITY</h4>
                    <p>15. The Renter is liable for:</p>
                    <p>a- any loss of, or damage to, the Vehicle and its accessories;</p>
                    <p>b- any consequential damage, loss or costs incurred by the Lessor, including salvage costs, loss of ability to re-hire and loss of revenue; and</p>
                    <p>c- any loss of, or damage to, Vehicles and property of third parties, arising during the term of hire.</p>

                    <h4>INSURANCE</h4>
                    <p>16. The Renter is advised that motor Vehicle insurance must be offered by the Lessor, but the Renter can make their own insurance arrangements, provided these are approved by the Lessor. If the Lessor is not satisfied that the Renter’s insurance is comparable to the Lessor’s, the Lessor may decline to hire the Vehicle.</p>
                    <p>17. If the Renter elects to use the Lessor’s insurance, any driver named in the Rental Document as a person permitted to drive the Vehicle is, subject to the damage administration fee in clause 21, the excess payable by the Renter as noted in clause 20 and the insurance exclusions set out in clause 22, covered against the losses set out in clause 15.</p>
                    <p>18. The Renter’s liability is covered by the Lessor’s insurance as set out in clause 15, up to the value of USD 100,000 in respect of the above sub-clauses 15(a) and 15(b), and USD 500,000 in respect of sub-clause 15(c). This clause 18 does not apply if the Renter rejects the Lessor’s insurance.</p>
                    <p>19. If the Renter elects to use the Lessor’s insurance, the insurance premium is included in the hire charge.</p>
                    <p>20. If the Renter elects to use the Lessor’s insurance, the excess payable by the Renter is as specified in the Rental Document and is payable for each and every incident involving the Vehicle. If the damage is excluded under the Lessor’s insurance, the excess will be considered part payment toward the total damage cost and any additional cost will be charged to the Renter in accord with clause 4.</p>
                    <p>21. An additional Damage Administration fee of USD 75 plus commercial tax will be applied for processing damage claims. This fee applies to all damage claims regardless of whether the Renter elects to use the Lessor’s insurance or has their own insurance arrangements. This fee may be refunded if it is proven that the damage was not due to the Renter’s fault.</p>
                    
                    <h4>INSURANCE EXCLUSIONS</h4>
                    <p>22. The Renter acknowledges that the cover referred to in clause 18 will not apply:</p>
                    <p>a- at any time when the driver of the Vehicle is under the influence of alcohol or any drug;</p>
                    <p>b- at any time when the Vehicle is in an unsafe or unroadworthy condition, such condition arising during the course of the hire, that caused or contributed to the damage or loss, and the Renter or driver was aware or should have been aware of the unsafe or unroadworthy condition of the Vehicle;</p>
                    <p>c- at any time when a mechanical failure breakdown or breakage occurs and/or an electrical or electronic failure or breakdown occurs that is the result of improper use of the Vehicle. This exclusion also applies to damage to the engine or transmission system directly resulting from any mechanical failure breakdown or breakage, but does not otherwise apply to resulting damage to other parts of the Vehicle;</p>
                    <p>d- at any time when the Vehicle is driven in any race, speed test, reliability trial, rally or contest, or operated on any race or rally circuit or in any event as a pace-maker, or testing in preparation for any of them;</p>
                    <p>e- at any time when the Vehicle is driven by anyone not named or described in the Rental Document as a person permitted to drive the Vehicle (unless the Renter is a body corporate or Department of State and the driver is authorised by them to drive, subject to all other terms and conditions in the Rental Agreement);</p>
                    <p>f- at any time when the Vehicle is driven by an unlicensed person;</p>
                    <p>g- at any time when the Vehicle is willfully or recklessly damaged or lost by the Renter, a nominated driver, or a person under the Renter’s authority or control;</p>
                    <p>h- at any time when the driver commits a traffic offence while driving the Vehicle;</p>
                    <p>i- at any time when the Vehicle is loaded or is being loaded in excess of the manufacturer’s specifications;</p>
                    <p>j- at any time when the Vehicle is being loaded or unloaded beyond the limits of a thoroughfare and such loading or unloading is not performed by the driver or attendant of the Vehicle;</p>
                    <p>k- at any time when the driver fails to stop or remain at the scene following the occurrence of an accident where required to do so by law;</p>
                    <p>l- to any fine or penalty imposed as a result of prosecution for breach of any law;</p>
                    <p>m- to any puncture, cut or bursting of any tyre, or damage to any tyre by application of brakes;</p>
                    <p>n- to any wear and tear to the Vehicle;</p>
                    <p>o- to any liability for damage caused by vibration or the weight of the Vehicle or its load to any: bridge or viaduct; any road or anything beneath a road; any underground pipe line or cable; or any other underground installation provided that the limit of liability in these circumstances will be USD 1,000,000;</p>
                    <p>p- to any overhead damage to the Vehicle or to the property of any third party resulting from such overhead damage;</p>
                    <p>q- at any time when the Vehicle was being driven on any of the following roads: any unformed roads and/or roads other than tarseal or metal; including but not limited to beaches, driveways, or any surface likely to damage the Vehicle; or</p>
                    <p>r- at any time when the Vehicle was operated beyond the term of the Rental Agreement or any agreed extension of the term, or at any other time or in any other circumstances notified by the Lessor to the Renter.</p>
                    
                    <h4>RENTER USES THEIR OWN INSURANCE</h4>
                    <p>23. If the Renter elects to use their own insurance, then the Renter accepts all liability for all losses, costs and damages set out in clause 15 (a) to (c), and agrees that clause 17 does not apply to such losses, costs and damages.</p>
                    
                    <h4>TRAFFIC OFFENCES</h4>
                    <p>24. All penalties related to traffic and/or parking offences are the responsibility of the Renter and the Lessor may charge the Renter’s credit card for any traffic and/or parking offence infringement fees incurred by the Renter. The Lessor undertakes, in the event that the Lessor receives notice of any traffic or parking offenses incurred by the Renter, to send a copy of any such notice to the Renter as soon as is practicable and to provide the necessary information to the relevant issuing authority for such notices to be directed to the Renter. The Renter has the right to challenge, complain about, query or object to the alleged offence to the issuing enforcement authority and has a right to seek a court hearing (within 30 days from the date of issue of the infringement notice).</p>
                    <p>The Lessor may also charge an administration fee of USD 30 plus commercial tax to cover the cost of processing and sending to the Renter notices related to traffic and/or parking infringements.</p>
                    
                    <h4>CANCELLATION OF HIRE AGREEMENT</h4>
                    <p>25. The Lessor has the right to terminate the hire and take immediate possession of the Vehicle if the Renter fails to comply with any of the terms of the Rental Agreement, or if the Vehicle is damaged. The termination of a hire under the authority of this clause shall be without prejudice to the other rights of the Lessor and the rights of the Renter under the Rental Agreement or otherwise.</p>
                    
                    <h4>GPS AND PORTABLE WIFI DEVICES</h4>
                    <p>26. The Renter acknowledges that they are liable for:</p>
                    <p>(a) damage to or loss, including theft, of the GPS and portable wifi units and/or their accessories. The charge is USD 200 plus commercial tax per unit; and</p>
                    <p>(b) a handling and freight fee where any unit accessory is damaged and/or not returned with the GPS or portable wifi unit. The charge is USD 30 plus commercial tax per rental.</p>
                    
                    <h4>OPTIONAL COVERAGES</h4>
                    <p>27. In addition to the insurance cover set out above, the Renter may also choose the Personal Accident Insurance (PAI) and/or Theft Protection (TP) options by so indicating on the Rental Document. PAI and TP insurance is offered on behalf of the current policy underwriter, and the Lessor acts only as their agent in arranging this insurance.</p>
                    <p>The Renter acknowledges that the underwriter of, and/or the terms of, and/or the charges payable for PAI or TP may change without notice to the Renter; or the availability of the PAI or TP options may be cancelled without notice to the Renter.</p>
                    
                    <h4>PRIVACY ACT</h4>
                    <p>28. The information requested from the Renter is to enable the Lessor to assess the Renter’s request to hire a Vehicle. The Renter does not have to supply this information, but if the Renter does not, then the Lessor is unable to hire the Vehicle. The Renter acknowledges that the Lessor will collect, hold and use the Renter’s personal information for purposes related to the hire of the Vehicle and the provision of related customer services, including direct marketing and assessing customer satisfaction with products and services provided by the Lessor. The Renter further acknowledges that such personal information may be disclosed to debt collection agencies in the event that the Renter defaults in the payment of any monies owing to the Lessor, or other parties involved in an accident with the Vehicle while on hire to the Renter; or any organisations responsible for the processing or handling of traffic related infringements; and the Renter hereby authorises the disclosure of their personal information for such purposes.</p>
                    
                    <h4>NOTE TO RENTER</h4>
                    <p>NOTE – THE LESSOR MUST GIVE THE RENTER AT LEAST ONE COPY OF THE RENTAL AGREEMENT WHICH MUST BE KEPT IN THE VEHICLE THROUGHOUT THE TERM OF THE HIRE AND PRODUCED ON DEMAND TO AN ENFORCEMENT OFFICER</p>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
