const cancelEmail = (firstName, lastName, brand, model, optionalEquipments, startingDate, endingDate, paymentAmount) => {
    let optionals = optionalEquipments.map(el => `a ${el.name}`)
    if(optionals.length > 1) optionals.splice(optionals.length -1, 1, ` and ${optionals[optionals.length -1]}`)
    else if (optionals.length === 1) optionals = [`--${optionals[0]}`]
    let formatOptional = ""
    optionals.forEach((el, k) => {
        if(k !== optionals.length-1)formatOptional += `, ${el}`
        else{
            formatOptional+= el
        }
    }) 
    let email = {
        body: {
            name: `${firstName} ${lastName}`,
            intro: [`We have succesfully processed your payment of $${paymentAmount/100} USD.`,
                `Today, you rented our ${brand} ${model}, from ${startingDate} to  ${endingDate}.`,
                `Also, ${optionals.length? `you added ${formatOptional.slice(2)}`: "you didn't add any optional equipments"} to your reserve.`],
            signature: "Sincerely",
            greeting: "Greetings ",
            outro: 'We thank you for trusting in our services.'
        }
    }
    return email
}





module.exports = {
    cancelEmail,
}