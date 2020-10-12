const { Router } = require('express')
const { model } = require('mongoose')
const User = require('../models/user')
const router = Router()

router.get('/login', async (req, res) => {
    user = req.session.userId ? await User.findById(req.session.userId) : null
    if(user){

        res.redirect('/games')
        //res.redirect('/login')
    }else{
      //  res.send('Не прошел по куки')
        res.render('layouts/login', {
            layout: 'layouts/index',
            title: 'Вход',
            alarmShow: false
        })
    }
})

router.post('/login', async(req, res) => {
    console.log(req.body)
    login = req.body.login
    password = req.body.password
    user = await User.findOne({login: login})
    if (user){
        if (user.validatePassword(password)){
            req.session.userId = user._id

            res.redirect('/games')
        }else{
            res.render('layouts/login', {
                layout: 'layouts/index',
                title: 'Вход',
                alarmShow: true
            })
        }
    }else{
        req.session.userId = null
        res.render('layouts/login', {
            layout: 'layouts/index',
            title: 'Вход',
            alarmShow: true
        })
    }
})

router.get('/logout', async (req, res) => {
  req.session.destroy (err => {
    if (err) {
      res.redirect('/')
    }
res.clearCookie(process.env.SESS_NAME)
res.redirect('/login')
  })
})
module.exports = router
