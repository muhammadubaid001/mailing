const { connect } = require("mongoose")

const connectDB = async () => {
    try {
        const db = await connect(process.env.DB_HOST)
        console.log("Db connected:", db.connection.host)
    } catch (error) {
        console.error("Error", error)
    }
}

module.exports = connectDB
