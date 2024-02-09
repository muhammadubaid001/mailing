const express = require("express");
const app = express();
const path = require("path");
const router = require("express").Router();
const cors = require("cors");
const fs = require("fs");
const mime = require("mime");
const cookieParser = require("cookie-parser");
const sendEmail = require("../utils/sendEmail");
const { Data } = require("./models/DataModel");
require("dotenv").config();

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "..", "dashboard", "build")));
app.use(express.urlencoded({ extended: true })); // key=value&key=value
app.use(cors({ origin: "*", credentials: true }));

async function getNextReferenceNumber() {
  // Find the maximum reference number in the database
  const maxDoc = await Data.findOne({}, {}, { sort: { referenceNumber: -1 } });

  // If no documents exist, start from 100
  if (!maxDoc) {
    return 100;
  }

  // Increment the maximum reference number by 1
  return maxDoc.referenceNumber + 1;
}

app.use(
  "/api",
  router.get("/data", async (req, res, next) => {
    try {
      const resp = await Data.find({});

      res.status(200).json({
        success: true,
        data: resp,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  })
);

app.use(
  "/api/",
  router.post("/send", async (req, res, next) => {
    try {
      console.log(req.body);
      const referenceNumber = await getNextReferenceNumber();

      // response.type = matches[1];
      // response.data = new Buffer(matches[2], "base64");
      // let decodedImg = response;
      // let imageBuffer = decodedImg.data;
      // let type = decodedImg.type;
      // let extension = mime.extension(type);
      // let fileName = "image." + extension;
      // fs.writeFileSync("./images/" + fileName, imageBuffer, "utf8");

      const data = await Data.create({
        referenceNumber,
        ...req.body,
      });
      await sendEmail({
        email: req.body.email,
        subject: "Please do not reply to this email",
        message: "noreply",
      });

      res.status(200).send({
        success: true,
        message: `Email sent successfully`,
        data,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  })
);

app.use("/public", express.static(path.join(__dirname, "..", "public")));

app.use("*", function (req, res) {
  // serve the build folder for client
  res.sendFile(
    path.join(__dirname, "..", "..", "dashboard", "build", "index.html")
  );
});

module.exports = {
  app,
};
