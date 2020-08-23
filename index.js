const express = require('express')
const session = require('express-session');
let ejs = require('ejs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo')(session);
const expressLayouts = require("express-ejs-layouts")
const fileUpload = require('express-fileupload');

const PORT = process.env.PORT || 3000
const MONGO = "mongodb+srv://admin:1913b7cd@museumbot-bebcr.mongodb.net/test?retryWrites=true&w=majority"

const app = express()
app.use(session({
        name: 'pushkinses',
        store: new MongoStore ({
            mongooseConnection: mongoose.connection,
            ttl: 3600*24*60
        }),
    resave: false,
    saveUninitialized: false,
    secret: 'PushkinMuseum',
    cookie: {
        sameSite: true,
        secure: false
    }
}));
app.use(fileUpload({ limits: { fileSize: 10 * 1024 * 1024 }}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set('views', 'pages');

//Models
const User = require('./models/user')



// Export routes
const MainRoute = require('./routes/main.js')
const Login = require('./routes/login');
const Games = require('./routes/game')
const Questions = require('./routes/questions')
const Users = require('./routes/newuser')

// Register routes
app.use(MainRoute)
app.use(Login)
app.use(Games)
app.use(Questions)
app.use(Users)

async function start(){
    try{
        await mongoose.connect(MONGO, {
            useNewUrlParser: true,
        })
        app.listen(PORT, () => {
            console.log('Already started')
        })
    }catch(e){
        console.log(e)
    }
}



start()
