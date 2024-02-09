const { app } = require("./src/app")
require("./src/config/database")()

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server started at port!!: ${PORT}`)
})
