const express = require('express')
const dotenv = require('dotenv')

// Load env vars
dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`App running in ${process.env.NODE_ENV} mode, listening on port ${port}`))