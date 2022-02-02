// =======================================
//              DEPENDENCIES
// =======================================
const express = require('express')
const methodOverride = require('method-override')
const cors = require('cors')
const CORS_WHITELIST = process.env.CORS_WHITELIST

// =======================================
//              MIDDLEWARE
// =======================================

app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(
    cors({
        origin: CORS_WHITELIST,
    })
)

// =======================================
//              CONTROLLERS
// =======================================
const usersController = require('./controllers/usersController')
const stockController = require('./controllers/stockController')

app.use('/users', usersController)
app.use('/stocks', stockController)
module.exports = app
