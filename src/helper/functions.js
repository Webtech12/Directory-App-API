// general async insert 
const postData = async (params) => {
    try {
        const savedData = await params.save()
        return savedData
    } catch (error) {
        throw new Error(error)
    }
}

// general async get * 
const fetchAll = async (parms) => {
    try {
        const lists = await parms.find({})
        return lists
    } catch (error) {
        throw new Error(error)
    }
}

// general async get by id 
const fetchById = async (...args) => {
    try {
        const data = await args[0].findById(args[1])
        if (!data) {
            throw new Error('Id not found')
        }
        return data
    } catch (error) {
        throw new Error(error)
    }
}

// general async update 
const updateData = async (...args) => {
    try {
        const updates = Object.keys(args[2])
        const updateDocument = await args[0].findById(`${args[1]}`)

        if (!updateDocument) throw new Error('document not found')

        updates.forEach((update) => updateDocument[update] = args[2][update])
        const updatedDocument = await updateDocument.save()

        return updatedDocument
    } catch (error) {
        throw new Error(error)
    }
}

// general async delete
const deleteData = async (...args) => {
    try {
        const deletedData = args[0].findByIdAndDelete(`${args[1]}`)
        if (!deletedData) throw new Error('document not found')
        return deletedData
    } catch (error) {
        throw new Error(error)
    }
}


module.exports = {
    postData,
    fetchAll,
    fetchById,
    updateData,
    deleteData
}