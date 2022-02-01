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

app.use('/users', usersController)
module.exports = app
