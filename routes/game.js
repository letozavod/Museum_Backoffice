const { Router } = require('express')
const { model } = require('mongoose')
const Quest = require('../models/quest')
const User = require('../models/user')
const Question = require('../models/question')
const question = require('../models/question')
const sorter = require('../sorter.js')

const router = Router()

router.get('/games', async(req, res) => {
    user = req.session.userId ? await User.findById(req.session.userId) : null
    if (user) {

        quests = await Quest.find()
         res.render('layouts/games', {
             layout: 'layouts/index',
             title: 'Список игр',
               user: user,
               quests: quests,
               alarmShow: false
         })
    } else {

        res.redirect('/login')
    }

})

router.get('/game/:id', async (req, res) => {
    user = req.session.userId ? await User.findById(req.session.userId) : null
    if (user) {
        quest = await Quest.findById(req.params.id)
        questions = quest ? await Question.find({ questid: req.params.id }) : null



      questions.sort(sorter('order_num'))



        res.render('layouts/game', {
            layout: 'layouts/index',
            title: 'Игра "' + quest.quest_name + '"',
              user: user,
              questions: questions,
              quest:quest
        })
    } else {
         res.redirect('/login')
    }
})

router.post('/addgame', async (req, res) => {
    user = req.session.userId ? await User.findById(req.session.userId) : null
    if (user) {
        questName = req.body.questname
        questDesc = req.body.questdesc
        isActive = false
        if (req.body.islinear=="on"){
        isLinear = true} else {
          isLinear=false
        }

        await new Quest({
            isactive: isActive,
            islinear: isLinear,
            quest_name: questName,
            quest_desc: questDesc
        }).save()

         res.redirect('/games')
    } else {
         res.redirect('/login')
    }
})

router.post('/deletegame/:id', async (req, res) => {
    user = req.session.userId ? await User.findById(req.session.userId) : null
    if (user) {
        quest = req.params.id ? await Quest.findByIdAndDelete(req.params.id) : null
        questions = req.params.id ? await Question.deleteMany({questid: req.params.id}) : null
         res.redirect('/games')
    } else {
         res.redirect('/login')
    }
})

router.post('/updategame/:id', async (req, res) => {
    user = req.session.userId ? await User.findById(req.session.userId) : null
    if (user) {
        quest = req.params.id ? await Quest.findById(req.params.id) : null
        if (quest) {
          if (req.body.islinear=="on"){
          isLinear = true} else {
            isLinear=false
          }
            quest.islinear = isLinear
            quest.quest_name = req.body.questname
            quest.quest_desc = req.body.questdesc
            await quest.save()
          res.redirect('/game/'+req.params.id)
        } else {
            res.redirect('/games')

        }

    } else {

         res.redirect('/login')
    }
})

router.post('/activategame/:id', async (req, res) => {
    user = req.session.userId ? await User.findById(req.session.userId) : null
    if (user) {
        quest = req.params.id ? await Quest.findById(req.params.id) : null
        if (quest) {
            quest.isactive = !quest.isactive
            await quest.save()
          res.redirect('/game/'+req.params.id)
        } else {
            res.redirect('/games')

        }

    } else {

         res.redirect('/login')
    }
})

module.exports = router
