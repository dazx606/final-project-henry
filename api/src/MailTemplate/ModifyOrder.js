require("dotenv").config();
const { YOUR_DOMAIN } = process.env;
const modifyOrder = (rentId, firstName, lastName, newStartingDate, newEndingDate) => {
   
    let email = {
        body: {
            name: `${firstName} ${lastName}`,
            intro: [`Your order #${rentId} has been successfully modified.`,
                `The new renting has been scheduled to be from ${newStartingDate} to ${newEndingDate}.`
                ],
                action: [
                    {
                        instructions: 'If you want to check your order, click on the button below.',
                        button: {
                            color: '#22BC66',
                            text: 'Go to my reservations',
                            link: `${YOUR_DOMAIN}/reservation/${rentId}`
                        }
                    }
                ],
            signature: "Sincerely",
            greeting: "Greetings ",
            outro: 'We thank you for trusting in our services.'
        }
    }
    return email
}





module.exports = {
    modifyOrder,
}