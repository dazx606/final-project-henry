

//===================================== MAIL TEMPLATE ==================================//

const confirmationEmail = (firstName, lastName, brand, model, startingDate, endingDate, paymentAmount,) => {
    let email = {
        body: {
            name: `${firstName} ${lastName}`,
            intro: ["Your order has been processed successfully",
                `You have rented our ${brand} ${model} from ${startingDate} to  ${endingDate}.`,
                `You added (optionalEquipments) to your reserve.`,
                `The total amount paid for this order is: $${paymentAmount/100} USD`],
            signature: "Sincerely",
            greeting: "Greetings ",
            outro: 'We thank you for renting our car.'
        }
    }
    return email
}





module.exports = {
    confirmationEmail,
}