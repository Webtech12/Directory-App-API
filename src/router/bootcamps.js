const express = require('express')
const router = express.Router()

const Url = require('../helper/helper')


router.get(`${Url}/bootcamps`, (req, res) => { res.status(200).send('all') })

router.get(`${Url}/bootcamps/:id`, (req, res) => {
    res.status(200).send(req.params.id)
})

router.post(`${Url}/bootcamps`, function (req, res) {
    res.status(201).send({ success: true, msg: 'created' })
})

router.patch(`${Url}/bootcamps/:id`, (req, res) => {
    res.status(200).send({ success: true, msg: 'update' })
})

router.delete(`${Url}/bootcamps/:id`, (req, res) => {
    res.status(200).send({ success: true, msg: 'delete' })
})


module.exports = router