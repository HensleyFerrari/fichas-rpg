require('dotenv').config('./env')

const express = require('express')
const cors = require('cors')
const allowCors = require('./config/cors')

const db = require('./models')

const app = express()

db.sequelize.sync()

app.use(cors())
app.use(express.json())
app.use(allowCors)
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.json({ message: "Welcome to test application." })
})

require('./routes/auth.routes')(app);

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server ir runing on port ${PORT}.`)
})