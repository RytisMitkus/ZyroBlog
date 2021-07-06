require('dotenv').config()
const express = require('express')
const morgan = require('morgan')

const userRoutes = require('./routes/userRoutes')




const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(morgan('tiny'))

const port = process.env.PORT || 4000

app.use('/user', userRoutes)

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
})