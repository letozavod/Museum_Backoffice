const { Router } = require('express')
const { model } = require('mongoose')
const Quest = require('../models/quest')
const User = require('../models/user')
const Question = require('../models/question')
const question = require('../models/question')
const router = Router()


router.post('/game/:id/addquestion', async (req, res) => {
    user = req.session.userId ? await User.findById(req.session.userId) : null
    if (user) {
        quest = await Quest.findById(req.params.id)
        questions = quest ? await Question.find({ questid: req.params.id }) : null
        maximum = 0
        if (questions){
            questions.forEach(element => {
                maximum = element.order_num > maximum ? element.order_num : maximum
            });
        }
        // -------------
        qText = req.body.text
        answer = req.body.answer
        answerOut = req.body.answerout
        orderNum = maximum
        await new Question({
            question_text: qText,
            answer: answer,
            answer_output: answerOut,
            order_num: orderNum,
            questid: req.params.id,
        }).save()


        // --------------
        res.send('Успешно')
        // res.redirect('/games')
    } else {
        res.send('Не прошел по куки')
        // res.redirect('/login')
    }
})

router.post('/deletequestion/:id', async (req, res) => {
    user = req.session.userId ? await User.findById(req.session.userId) : null
    if (user) {
        question = req.params.id ? await Question.findByIdAndDelete(req.params.id) : null
        // --------------
        res.send('Успешно')
        // res.redirect('/game/', question.questid)
    } else {
        res.send('Не прошел по куки')
        // res.redirect('/login')
    }
})

router.post('/updatequestion/:id', async (req, res) => {
    user = req.session.userId ? await User.findById(req.session.userId) : null
    if (user) {
        question = req.params.id ? await Question.findById(req.params.id) : null
        if(question){
            question.question_text = req.body.text
            question.answer = req.body.answer
            question.answer_output = req.body.answerout
            await question.save()
            res.send('Успешно')
        }else{
            res.send('Не нашел вопрос')

        }
        // res.redirect('/game/', question.questid)
    } else {
        res.send('Не прошел по куки')
        // res.redirect('/login')
    }
})

module.exports = router