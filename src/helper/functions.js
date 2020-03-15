// requiring global async handler
const asyncHandler = require('../middleware/async')

// general async insert 
const postData = asyncHandler(async (params) => {
    const savedData = await params.save()
    return savedData
})

// general async get * 
const fetchAll = asyncHandler(async (parms) => {
    const lists = await parms.find({})
    return lists
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


module.exports = {
    postData,
    fetchAll,
    fetchById,
    updateData,
    deleteData
}