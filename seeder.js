const fs = require('fs')
const EventEmitter = require('events')
const dotenv = require('dotenv')

// Load env vars
dotenv.config()
// Load DB connection
require('./src/db/mongoose')

// load model
const Bootcamp = require('./src/models/bootcamp')
const { postData } = require('./src/helper/functions')


// read JSON files
const parsedData = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
)

// event to fire when importing files (error)
const myEmitter = new EventEmitter()

myEmitter.on('import', async () => {
    const bootcamp = new Bootcamp(parsedData)
    

    await postData(bootcamp)
        .then((result) => console.log('Imported'))
        .catch(err => console.log(err))
    process.exit()
    // await Bootcamp.save().then(() => console.log('Imported')).catch((err) => console.log(err))
})




if (process.argv[2] === '-i') {
    myEmitter.emit('import')
    // console.log(parsedData)
}


