import nodemailer from "nodemailer";

const sendEmail = async (options: {
  email: string;
  subject: string;
  message: string;
}) => {
  let transporter = nodemailer.createTransport({
    name: process.env.EMAIL_NAME!,
    host: process.env.EMAIL_HOST!,
    port: process.env.EMAIL_PORT!,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // tls: {
    //   rejectUnauthorized: false,
    // },
  });

  //Defining some of the options pertaining to the mail
  const mailOptions = {
    from: "Rise Up <info@riseupper.org>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  let info = await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
