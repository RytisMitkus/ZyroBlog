require('dotenv').config()
const express = require('express')
const morgan = require('morgan')

const userRoutes = require('./routes/userRoutes')
const blogRoutes = require('./routes/blogRoutes')

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(morgan('tiny'))

const port = process.env.PORT || 4000

app.use('/api/users', userRoutes)
app.use('/api/blog', blogRoutes)

app.use((err, req, res, next) => {
  if (err.status === 422) {
    res.status(422).json(err.errors)
    return
  }
  // if (err.sqlState || err.sql || err.sqlMessage) {
  //   // Hide message from DB
  //   // eslint-disable-next-line no-param-reassign
  //   err.message = 'Error 500. Database error'
  // }
  res.status(err.status || 500).json({
    error: err.status || 500,
    message: typeof err === 'string'
      ? err : err.message || 'Error 500. Internal server error',
  })
})

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`)
})
