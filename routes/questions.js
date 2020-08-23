const { Router } = require('express')
const { model } = require('mongoose')
const Quest = require('../models/quest')
const User = require('../models/user')
const Question = require('../models/question')
const router = Router()

router.get('/updatequestion/:id', async (req, res) => {
    user = req.session.userId ? await User.findById(req.session.userId) : null
    if (user) {
      question = req.params.id ? await Question.findById(req.params.id) : null
      if(question){
        res.render('layouts/editquestion', {
            layout: 'layouts/index',
            title: 'Редактировать вопрос',
              user: user,
              question: question,
        })
      }else{
        res.redirect('/games')

      }

    } else {
         res.redirect('/login')
    }
})

router.post('/game/:id/addquestion', async (req, res) => {
    user = req.session.userId ? await User.findById(req.session.userId) : null
    if (user) {
        quest = await Quest.findById(req.params.id)
        questions = quest ? await Question.find({ questid: req.params.id }) : null
        maximum = 0
        if (questions){
            questions.forEach(element => {
                if (element.order_num>=maximum){
                  maximum = element.order_num + 1
                }
            });
        }
        // -------------
        qText = req.body.text
        answer = req.body.answer.replace('; ',';')
        answerOut = req.body.answerout
        orderNum = maximum
        await new Question({
            question_text: qText,
            answer: answer,
            answer_output: answerOut,
            order_num: orderNum,
            questid: req.params.id,
            hint: req.body.hint,
            vr_link: req.body.vrlink,
            correct_score: req.body.cscore,
            hint_score: req.body.hscore,
            wrong_score: req.body.wscore,
            image: req.files.file.data,
            image_name: req.files.file.name,
        }).save()


        // --------------
        res.redirect('/game/'+req.params.id)
    } else {

        res.redirect('/login')
    }
})

router.post('/deletequestion/:id', async (req, res) => {
    user = req.session.userId ? await User.findById(req.session.userId) : null
    if (user) {
        question = req.params.id ? await Question.findByIdAndDelete(req.params.id) : null
        res.redirect('/game/'+question.questid)
    } else {

         res.redirect('/login')
    }
})

router.post('/updatequestion/:id', async (req, res) => {
    user = req.session.userId ? await User.findById(req.session.userId) : null
    if (user) {
        question = req.params.id ? await Question.findById(req.params.id) : null
        if(question){
          answer = req.body.answer.replace('; ',';')
            question.question_text = req.body.text
            question.answer = answer
            question.answer_output = req.body.answerout
            question.hint = req.body.hint,
            question.vr_link = req.body.vrlink,
            question.correct_score = req.body.cscore,
            question.hint_score = req.body.hscore,
            question.wrong_score = req.body.wscore
            question.image = req.files.file.data
            question.image_name = req.files.file.name
            await question.save()
            res.redirect('/game/'+question.questid)
        }else{
          res.redirect('/game/'+question.questid)

        }
    } else {

        res.redirect('/login')
    }
})

module.exports = router
