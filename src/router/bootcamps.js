const express = require('express')
const router = express.Router()

const Url = require('../helper/helper')
const Bootcamp = require('../models/bootcamp')
const { postData, fetchAll, fetchById, updateData, deleteData, getBootcampsInRadius } = require('../helper/functions')


router.get(`${Url}/bootcamps`, async (req, res) => {
    // Copy req.query
    const reqQuery = { ...req.query }
    // fields to exclude
    const removeFields = ['select']
    // loop over remove fields and delete them from reqQuery
    removeFields.forEach(params => delete reqQuery[params])
    // create query string
    let queryStr = JSON.stringify(reqQuery)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

    await fetchAll(Bootcamp, queryStr).then(result => res.status(200).send({ success: true, count: result.length, data: result })).catch(err => res.status(500).send(err.message))
})

router.get(`${Url}/bootcamps/:id`, async (req, res) => {
    await fetchById(Bootcamp, req.params.id)
        .then(result => res.status(200).send({ success: true, data: result }))
        .catch(err => res.status(500).send({ msg: 'Unable to find', error: err.message }))
})

router.post(`${Url}/bootcamps`, async (req, res) => {
    const bootcamp = new Bootcamp(req.body)
    await postData(bootcamp)
        .then((result) => res.status(201).send({ success: true, data: result }))
        .catch(err => res.status(400).send({ success: false, error: err.message }))

})

router.patch(`${Url}/bootcamps/:id`, async (req, res) => {


    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'description', 'website', 'phone', 'email', 'address']
    const isValid = updates.every(update => allowedUpdates.includes(update))

    if (!isValid) return res.status(400).send({ error: 'invalid updates' })

    await updateData(Bootcamp, req.params.id, req.body)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(404).send({ msg: 'Unable to find', error: err.message }))
})

router.delete(`${Url}/bootcamps/:id`, async (req, res) => {
    await deleteData(Bootcamp, req.params.id)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(404).send({ msg: 'Unable to find', error: err.message }))
})


// Get bootcamps within a certain radius
router.get(`${Url}/bootcamps/radius/:zipcode/:distance`, async (req, res) => {
    await getBootcampsInRadius(Bootcamp, req.params)
        .then(result => res.status(200).send({ success: true, count: result.length, data: result }))
        .catch(err => res.status(404).send({ msg: 'Unable to find', error: err.message }))
})


module.exports = router