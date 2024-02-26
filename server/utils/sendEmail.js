const nodeMailer = require("nodemailer");
const path = require("path");
const PDFDocument = require("pdfkit");
const fs = require("fs");

const sendEmail = async ({ email, subject, message, data, id }) => {
  const output = `
        <div>
            <h1>Generator Information</h1>
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

  // Create a new PDF document
  const doc = new PDFDocument();

  // Add content to the PDF document
  doc.fontSize(25).text('Generator Information', 60, 80);
  doc.text(`Client: ${data.client}`, 80, 130);
  doc.text(`Email: ${data.email}`, 80, 150);
  doc.text(`Address: ${data.address}`, 80, 170);
  doc.text(`Phone: ${data.phoneNumber}`, 80, 190);
  doc.text(`Date: ${data.generalDate}`, 80, 210);

   doc.text("Transporter Information", 60,250);
  doc.text(`Company: ${data.companyName}`, 80, 270);
  doc.text(`Items Collected: ${data.representative}`, 80, 290);
  doc.text(`Name: ${data.transporterName}`, 80, 310);
  doc.text(`Address: ${data.transporterAddress}`, 80, 330);
  doc.text(`Phone: ${data.transporterPhoneNumber}`, 80, 410);
  doc.text(`Date: ${data.transporterDate}`, 80, 430);

  // doc
  //   .image(path.join(__dirname, "..", `/public/${id}.png`), 0, 15, {
  //     width: 300,
  //   })
  // Save the PDF file to disk
  doc.pipe(
    fs.createWriteStream(path.join(__dirname, "..", `/public/${id}.pdf`))
  );

  // End the document
  doc.end();

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
        filename: "output.pdf",
        path: path.join(__dirname, "..", `/public/${id}.pdf`),
        contentType: "application/pdf",
      },
      {
            filename: "sign.png",
            path: path.join(__dirname, "..", `/public/${id}.png`),
          },
    ],
    // attachments: [
    //   {
    //     filename: "sign.png",
    //     path: path.join(__dirname, "..", `/public/${id}.png`),
    //   },
    // ],
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
