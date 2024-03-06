const nodeMailer = require("nodemailer");
const path = require("path");
const PDFDocument = require("pdfkit");
const fs = require("fs");

const sendEmail = async ({ email, subject, message, data, id, buffer }) => {
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

  const image = data?.companyName === "Synergy Environmental" ? path.join(__dirname, "..", "/public/PHOTO-2024-03-06-01-39-22.jpg") : path.join(__dirname, "..",  "/public/PHOTO-2024-03-06-01-39-23 2.jpg")
  doc.image(
    image,
    {
      fit: [200, 100],
      align: "center",
      valign: "center",
    },
  );

  // Add content to the PDF document
  doc.font("Times-Bold").fontSize(20).text("Regulated Medical Waste Manifest", 60, 200);
  doc.moveDown();
  doc.fontSize(14)
  doc.font("Times-Bold").text("Generator Information", 60, 230);
  doc.font("Times-Roman")
  doc.text(`Client: ${data.client}`, 80, 250);
  doc.text(`Email: ${data.email}`, 80, 270);
  doc.text(`Address: ${data.address}`, 80, 290);
  doc.text(`Phone: ${data.phoneNumber}`, 80, 310);
  doc.text(`Date: ${data.generalDate}`, 80, 330);

  doc.moveDown();
  doc.font("Times-Bold").text("Transporter Information", 60, 350);
  doc.font("Times-Roman")
  doc.text(`Company: ${data.companyName}`, 80, 370);
  doc.text(`Items Collected: ${data.representative}`, 80, 390);
  doc.text(`Name: ${data.transporterName}`, 80, 410);
  doc.text(`Address: ${data.transporterAddress}`, 80, 430);
  doc.text(`Phone: ${data.transporterPhoneNumber}`, 80, 450);
  doc.text(`Date: ${data.transporterDate}`, 80, 470);
  doc.text("I certify that the contents of this shipment are fully and accurately described, labeled and are in proper condition for transportation according to the applicable state and federal regulations.", 60, 490);

  // doc.pipe(
  //   fs.createWriteStream(path.join(__dirname, "..", `/public/${id}.PNG`))
  // );
  // const imagePath = path.join(__dirname, "..", `/public/${id}.PNG`);
  // console.log(imagePath);
  // doc.image(imagePath, {
  //   align: "center",
  //   valign: "center",
  // });

  doc.image(
    buffer,
    {
      fit: [200, 100],
      align: "center",
      valign: "center",
    }
  );

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
