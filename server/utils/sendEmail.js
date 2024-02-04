const nodeMailer = require("nodemailer");
const path = require("path");

const sendEmail = async ({ email, subject, message }) => {
  const output = `
        <div>
            <h1>Thank you</h1>
        </div>
    `;

  // const transporter = nodeMailer.createTransport({
  //     host: 'smtp.gmail.com',
  //     port: 465,
  //     service: process.env.SMTP_SERVICE,
  //     auth: {
  //         user: process.env.SMTP_MAIL,
  //         pass: process.env.SMTP_PASSWORD
  //     }
  // })

  // For Mailtrap
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    host: process.env.SMTP_HOST, //"smtp.gmail.com"
    port: 465,
    auth: {
      user: process.env.SMTP_MAIL, 
      pass: process.env.SMTP_PASSWORD, 
    },
  });

  const mailOptions = {
    from: {
      name: "Ubaid",
      address: process.env.SMTP_MAIL,
    },
    to: email,
    subject,
    text: message,
    html: output,
    // attachments: [
    //   {
    //     filename: "sign.png",
    //     path: path.join(__dirname, "..", "/public/sign.png"),
    //   },
    // ],
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
