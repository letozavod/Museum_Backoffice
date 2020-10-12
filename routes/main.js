const { Router } = require('express')
const { model } = require('mongoose')
const Coupon = require('../models/coupon')
const Winner = require('../models/winner')
const User = require('../models/user')
const router = Router()

router.get('/', (req, res) => {
  res.redirect('/login')
})

router.get('/promocodes', async (req, res) => {
    user = req.session.userId ? await User.findById(req.session.userId) : null
    if (user) {
        codes = await Coupon.find().populate('userid', 'username')

        res.render('layouts/promocodes', {
            layout: 'layouts/index',
            title: 'Список промокодов',
              codes: codes
        })
    } else {

         res.redirect('/login')
    }
})

module.exports = router
