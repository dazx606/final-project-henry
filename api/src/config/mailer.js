const nodemailer = require('nodemailer');
require('dotenv').config();
const { MIDDLE_EMAIL, MIDDLE_EMAIL_PASS } = process.env

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
        user: MIDDLE_EMAIL, 
        pass: MIDDLE_EMAIL_PASS, 
    },
});

try {
  transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {    
      console.log("Server is ready to take our messages");
    }
  });
} catch (error) {
  console.log(error);
}


  module.exports = {
      transporter
  }