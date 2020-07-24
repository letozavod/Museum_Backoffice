const { Router } = require('express')
const { model } = require('mongoose')
const User = require('../models/user')
const router = Router()

router.get('/users', async (req, res) => {
    user = req.session.userId ? await User.findById(req.session.userId) : null
    if (user && user.god) {
        users = await User.find({'god' : false})
        res.render('layouts/admin', {
            layout: 'layouts/index',
            title: 'Список пользователей',
              user: user,
              users: users
        })
    } else {

         res.redirect('/login')
    }
})

router.post('/newuser', async (req, res) => {
    user = req.session.userId ? await User.findById(req.session.userId) : null
    if (user && user.god) {
        userNew = User({
            login: req.body.login,
            name: req.body.name,
        })
        userNew.setPassword(req.body.password)
        userNew.save()
         res.redirect('/users')
    } else {
         res.redirect('/login')
    }
})

router.post('/deleteuser/:id', async (req, res) => {
    user = req.session.userId ? await User.findById(req.session.userId) : null
    if (user && user.god) {
        await User.findByIdAndDelete(req.params.id)
         res.redirect('/users')
    } else {
         res.redirect('/login')
    }
})

module.exports = router
