const express = require("express");
const app = express();
const path = require("path");
const router = require("express").Router();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sendEmail = require("../utils/sendEmail");
require("dotenv").config()

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "..", "dashboard", "build")));
app.use(express.urlencoded({ extended: true })); // key=value&key=value
app.use(cors({ origin: "*", credentials: true }));

app.use(
  "/api/",
  router.post("/send", async (req, res, next) => {
    try {

        await sendEmail({
            email:req.body.email,
            subject: "Please do not reply to this email",
            message: 'noreply'
        })

        res.status(200).send({
            success: true,
            message: `Email sent to successfully`
        })

    } catch (error) {
       res.status(500).send({message: error.message})
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
