const { Router } = require('express')
const { model } = require('mongoose')
const Quest = require('../models/quest')
const User = require('../models/user')
const Question = require('../models/question')
const question = require('../models/question')

const router = Router()

router.get('/games', async(req, res) => {
    user = req.session.userId ? await User.findById(req.session.userId) : null
    if (user) {
        
        quests = await Quest.find()
        res.send(quests)
        // res.render('main', {
        //     layout: 'layouts/games',
        //     title: 'Список игр'
        // })
    } else {
        res.send('Не прошел по куки')
        // res.redirect('/login')
    }
    
})

router.get('/game/:id', async (req, res) => {
    user = req.session.userId ? await User.findById(req.session.userId) : null
    if (user) {
        quest = await Quest.findById(req.params.id)
        questions = quest ? await Question.find({ questid: req.params.id }) : null
        res.send({QUEST: quest, Questions: questions})



        //TODO Сортировка вопросов



        // res.render('main', {
        //     layout: 'layouts/game',
        //     title: 'Игра #'
        // })
    } else {
        res.send('Не прошел по куки')
        // res.redirect('/login')
    }
})

router.post('/addgame', async (req, res) => {
    user = req.session.userId ? await User.findById(req.session.userId) : null
    if (user) {
        questName = req.body.questname
        questDesc = req.body.questdesc
        isActive = req.body.isactive
        isLinear = req.body.islinear
        await new Quest({
            isactive: isActive,
            islinear: isLinear,
            quest_name: questName,
            quest_desc: questDesc
        }).save()
        res.send('Успешно')
        // res.redirect('/games')
    } else {
        res.send('Не прошел по куки')
        // res.redirect('/login')
    }
})

router.post('/deletegame/:id', async (req, res) => {
    user = req.session.userId ? await User.findById(req.session.userId) : null
    if (user) {
        quest = req.params.id ? await Quest.findByIdAndDelete(req.params.id) : null
        questions = req.params.id ? await Question.deleteMany({questid: req.params.id}) : null
        res.send('Успешно')
        // res.redirect('/games')
    } else {
        res.send('Не прошел по куки')
        // res.redirect('/login')
    }
})

router.post('/updategame/:id', async (req, res) => {
    user = req.session.userId ? await User.findById(req.session.userId) : null
    if (user) {
        quest = req.params.id ? await Quest.findById(req.params.id) : null
        if (quest) {
            quest.isactive = req.body.isactive
            quest.islinear = req.body.islinear
            quest.quest_name = req.body.questname
            quest.quest_desc = req.body.questdesc
            await quest.save()
            res.send('Успешно')
        } else {
            res.send('Не нашел квест')

        }
        // res.redirect('/games')
    } else {
        res.send('Не прошел по куки')
        // res.redirect('/login')
    }
})

module.exports = router