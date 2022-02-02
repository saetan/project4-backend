// =======================================
//              DEPENDENCIES
// =======================================

const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = require('./app')
// =======================================
//              DATABASE
// =======================================

const PORT = process.env.PORT || 8000
const DATABASE = process.env.DATABASE
const MONGO_USER = process.env.MONGO_USER
const MONGO_PASSWORD = process.env.MONGO_PASSWORD
const MONGO_BASE_URL = process.env.MONGO_BASE_URL
const MONGO_URL = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_BASE_URL}/${DATABASE}?retryWrites=true&w=majority`

// =======================================
//              LISTENER
// =======================================

mongoose.connect(MONGO_URL).then(async () => {
    console.log('Database Connected')
    app.listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}`)
    })
})
