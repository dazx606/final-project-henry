
const cancelEmail = (rentId, firstName, lastName, discount, paymentAmount) => {
    const total = paymentAmount.reduce((prev, actual) => prev + actual, 0)
    const totalWithFee = Math.floor(total * discount)
    let email = {
        body: {
            name: `${firstName} ${lastName}`,
            intro: [`The order #${rentId} has been canceled.`,
            `We have deducted ${Math.ceil((1 - discount) *100)}% as a fee from the $${total / 100} USD paid.`,
            `The total amount being refunded to your account is: $${totalWithFee/100} USD.`,
            `This process may take up to 10 business days.`],
            signature: "Sincerely",
            greeting: "Greetings ",
            outro: 'We don’t want to see you go, but totally understand that cancellations happen. Just know that your account and settings are saved so the door is always open to get going with Luxurent again!'
        }
    }
    return email
}





module.exports = {
    cancelEmail,
}