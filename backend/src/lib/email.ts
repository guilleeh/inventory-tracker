const nodemailer = require("nodemailer");

const sendEmail = async (to: string, subject: string, text: string) => {
  console.log(process.env.MAIL_HOST, process.env.MAIL_PORT);
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  // send mail with defined transport object
  console.log(to);
  const info = await transporter.sendMail({
    from: `Inventory Tracker 👻 <${process.env.MAIL_USERNAME}>`, // sender address
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
