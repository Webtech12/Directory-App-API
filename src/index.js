const express = require('express')
const dotenv = require('dotenv')
const Url = require('../helper/helper')

// Load env vars
dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req, res) => res.send('Hello World!'))
app.get(`${Url}/bootcamps`, (req, res) => { res.status(200).send('works') })



app.listen(port, () => console.log(`App running in ${process.env.NODE_ENV} mode, listening on port ${port}`))