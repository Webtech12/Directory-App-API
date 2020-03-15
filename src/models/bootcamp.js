const mongoose = require('mongoose')
const slugify = require('slugify')
const geocoder = require('../helper/geocode')

const BootcampSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add name'],
        unique: true,
        trim: true,
        maxlength: [20, 'Name must be less than 20 chars']
    },
    slug: String,
    description: {
        type: String,
        required: [true, 'Please add description'],
        maxlength: [500, 'description must be less than 500 chars']
    },
    website: {
        type: String,
        match: [
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'Please use a valid URL with http or https'
        ]
    },
    phone: {
        type: Number,
        maxlength: [20, 'phone must be less than 20 chars']
    },
    email: {
        type: String,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    location: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String,
    },
    careers: {
        // array of strings
        type: [String],
        required: true,
        enum: ["Web Development", "UI/UX", "Business", "Mobile Development", "Data Science"]
    },
    averageRating: {
        type: Number,
        minlength: 1,
        maxlength: 10
    },
    averageCost: Number,
    avatar: {
        type: Buffer
    },
    housing: {
        type: Boolean,
        default: false
    },
    jobAssistance: {
        type: Boolean,
        default: false
    },
    jobGaurantee: {
        type: Boolean,
        default: false
    },
    acceptGi: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
})


// hooks
BootcampSchema.pre('save', async function (next) {
    this.slug = await slugify(this.name, { lower: true })

    next()
})

BootcampSchema.pre('save', async function (next) {
    const loc = await geocoder.geocode(this.address)
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
        street: loc[0].streetName,
        city: loc[0].city,
        state: loc[0].state,
        zipcode: loc[0].zipcode,
        country: loc[0].countryCode,
    }

    // do not save in DB
    this.address = undefined
    next()
})


// export models
const Bootcamp = mongoose.model('Bootcamp', BootcampSchema)

module.exports = Bootcamp