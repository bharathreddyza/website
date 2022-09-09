"use strict";
const nodemailer = require("nodemailer");
const { getMaxListeners } = require("process");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    port: 587,
    tls: {
      rejectUnauthorized: false,
    },
    secure: false, // true for 465, false for other ports
    auth: {
      user: "contact@manyfist.com", // generated ethereal user
      pass: "back3654/", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"manyfist" <contact@manyfist.com>', // sender address
    to: "bharathreddyza@gmail.com", //req.body.email, // list of receivers
    subject: `Hey ${req.body.name} thanks for being a part of the legion`, // Subject line
    text: " follow this space for more updates", // plain text body
    html: "<b>make sure to follow us on social media to stay updated </b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  res.send("succes");
}

main().catch(console.error);
