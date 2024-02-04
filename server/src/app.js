const express = require("express")
const app = express()
const path = require("path")

const cors = require("cors")
const cookieParser = require("cookie-parser")

// Middlewares
app.use(cookieParser())
app.use(express.json())
app.use(express.static(path.join(__dirname, "..", "..", "dashboard", "build")))
app.use(express.urlencoded({ extended: true })) // key=value&key=value
app.use(cors({ origin: "*", credentials: true }))


app.use("/public", express.static(path.join(__dirname, "..", "public")))

app.use("*", function (req, res) {
    // serve the build folder for client
    res.sendFile(
        path.join(__dirname, "..", "..", "dashboard", "build", "index.html"),
    )
})

module.exports = {
    app
}
