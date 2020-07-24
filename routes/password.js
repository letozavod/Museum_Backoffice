const { Router } = require('express')
const { model } = require('mongoose')
const router = Router()


router.post('/password', (req, res) => {
  user = req.session.userId ? await User.findById(req.session.userId) : null
  if (user) {

       res.render('layouts/games', {
           layout: 'layouts/index',
           title: 'Список игр',
             user: user,
             quests: quests
       })
  } else {

      res.redirect('/login')
  }

})

module.exports = router
