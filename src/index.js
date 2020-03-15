const express = require('express')
const dotenv = require('dotenv')

// Load env vars
dotenv.config()
// Load DB connection
require('./db/mongoose')

const bootcampsRoutes = require('./router/bootcamps')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req, res) => res.send('Hello World!'))


// bootcamps routes
app.use(bootcampsRoutes)


app.listen(port, () => console.log(`App running in ${process.env.NODE_ENV} mode, listening on port ${port}`))