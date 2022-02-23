// =======================================
//              DEPENDENCIES
// =======================================
const express = require('express')
const methodOverride = require('method-override')
const cors = require('cors')
const CORS_WHITELIST = process.env.CORS_WHITELIST
const session = require('express-session')
const MongoDBSession = require('connect-mongodb-session')(session)
require('dotenv').config()
app = express()

const DATABASE = process.env.DATABASE
const MONGO_USER = process.env.MONGO_USER
const MONGO_PASSWORD = process.env.MONGO_PASSWORD
const MONGO_BASE_URL = process.env.MONGO_BASE_URL
const MONGO_URL = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_BASE_URL}/${DATABASE}?retryWrites=true&w=majority`
// =======================================
//              MIDDLEWARE
// =======================================
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(
    cors({
        origin: CORS_WHITELIST,
        credentials: true,
    })
)

const store = new MongoDBSession({
    uri: MONGO_URL,
    collection: 'mySessions',
})

app.set('trust proxy', 1)
app.use(
    session({
        secret: process.env.SESSIONSECRET,
        saveUninitialized: false,
        resave: false,
        proxy: true,
        store: store,
        cookie: {
            secure: true,
            maxAge: 1000 * 60 * 60 * 24,
        },
    })
)

// =======================================
//              CONTROLLERS
// =======================================
const sessionController = require('./controllers/sessionsController')
const usersController = require('./controllers/usersController')
const stockController = require('./controllers/stockController')
const employeeController = require('./controllers/employeeController')
const ordersController = require('./controllers/ordersController')

app.use('/sessions', sessionController)
app.use('/users', usersController)
app.use('/stocks', stockController)
app.use('/employees', employeeController)
app.use('/orders', ordersController)

module.exports = app
