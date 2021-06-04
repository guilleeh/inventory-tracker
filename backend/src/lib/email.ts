const nodemailer = require("nodemailer");

const sendEmail = async (to: string, subject: string, text: string) => {
  console.log(process.env.MAIL_HOST, process.env.MAIL_PORT);
  const transporter = nodemailer.createTransport({
    host: "smtp.mail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"Inventory Tracker 👻" <${process.env.MAIL_USERNAME}>`, // sender address
    to,
    subject,
    text,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

module.exports = {
  sendEmail,
};
