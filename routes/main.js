const { Router } = require('express')
const { model } = require('mongoose')
const router = Router()

router.get('/', (req, res) => {
  res.redirect('/login')
})

module.exports = router
