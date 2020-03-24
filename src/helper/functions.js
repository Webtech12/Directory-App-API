// requiring global async handler
const asyncHandler = require('../middleware/async')
const geocoder = require('./geocode')

// general async insert 
const postData = asyncHandler(async (params) => {
    const savedData = await params.save()
    return savedData
})

// general async get * 
const fetchAll = asyncHandler(async (...args) => {
    let fields;
    let sortBy;
    if (args[2].select) {
        fields = args[2].select.split(',').join(' ')
    }
    if (args[2].sort) {
        sortBy = args[2].sort.split(',').join(' ')
    } else {
        sortBy = '-createdAt'
    }

    // Pagination
    const page = parseInt(args[2].page, 10) || 1
    const limit = parseInt(args[2].limit, 10) || 100
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const total = await args[0].countDocuments()

    // Pagintaion result
    const pagination = {}
    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit
        }
    }
    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        }
    }

    const lists = await args[0].find(JSON.parse(args[1])).select(fields).sort(sortBy).skip(startIndex).limit(limit)
    return {lists, pagination}
})

// general async get by id 
const fetchById = asyncHandler(async (...args) => {
    const data = await args[0].findById(args[1])
    if (!data) throw new Error('Id not found')
    return data
})

// general async update 
const updateData = asyncHandler(async (...args) => {
    const updates = Object.keys(args[2])
    const updateDocument = await args[0].findById(`${args[1]}`)

    if (!updateDocument) throw new Error('document not found')

    updates.forEach((update) => updateDocument[update] = args[2][update])
    const updatedDocument = await updateDocument.save()
    return updatedDocument
})

// general async delete
const deleteData = asyncHandler(async (...args) => {
    const deletedData = await args[0].findByIdAndDelete(`${args[1]}`)
    if (!deletedData) throw new Error('document not found')
    return deletedData
})



// Get bootcamps within a certain radius
// @route   /bootcamps/radius/:zipcode/:distance
const getBootcampsInRadius = asyncHandler(async (...args) => {
    const { zipcode, distance } = args[1]

    // Get lng/lat from geocoder
    const loc = await geocoder.geocode(zipcode)
    const lat = loc[0].latitude
    const lng = loc[0].longitude

    // Cal radius using radians
    // Divide dist with radius of earth
    // Earth radius = 3,936 mi / 6,378 km
    const radius = distance / 6378

    const bootcamps = await args[0].find({
        location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
    })

    return bootcamps

})


module.exports = {
    postData,
    fetchAll,
    fetchById,
    updateData,
    deleteData,
    getBootcampsInRadius
}