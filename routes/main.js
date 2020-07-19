const { Router } = require('express')
const { model } = require('mongoose')
const router = Router()

router.get('/', (req, res) => {
    res.render('main', {
        layout: 'layouts/index',
        title: 'Привет'
    })
})

module.exports = router