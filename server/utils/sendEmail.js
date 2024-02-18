const nodeMailer = require("nodemailer");
const path = require("path");

const sendEmail = async ({ email, subject, message, data, id }) => {
  const output = `
        <div>
            <h1>General Information</h1>

    <p>Client: ${data.client}</p>
    <p>Email: ${data.email}</p>
    <p>Address: ${data.address}</p>
    <p>Phone: ${data.phoneNumber}</p>
    <p>Date: ${data.generalDate}</p>

    <h1>Transporter Information</h1>
    <p>Company: ${data.companyName}</p>
    <p>Items Collected: ${data.representative}</p>
    <p>Name: ${data.transporterName}</p>
    <p>Address: ${data.transporterAddress}</p>
    <p>Phone: ${data.transporterPhoneNumber}</p>
    <p>Date: ${data.transporterDate}</p>
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
      name: "RRBC",
      address: process.env.SMTP_MAIL,
    },
    to: email,
    subject,
    text: message,
    html: output,
    attachments: [
      {
        filename: "sign.png",
        path: path.join(__dirname, "..", `/public/${id}.png`),
      },
    ],
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
