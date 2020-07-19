const { Router } = require('express')
const { model } = require('mongoose')
const router = Router()

router.get('/password', (req, res) => {
    res.render('main', {
        layout: 'layouts/index',
        title: 'Изменить пароль'
    })
})

router.post('/password', (req, res) => {
    res.redirect('/')
})

module.exports = router