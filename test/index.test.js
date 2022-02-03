// =======================================
//              DEPENDENCIES
// =======================================

const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = require('../app')
const supertest = require('supertest')
const User = require('../models/UserModel')
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

beforeEach((done) => {
    mongoose.connect(
        MONGO_URL,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => done()
    )
})

afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => done())
    })
})

test('GET /users', async () => {
    const users = await User.find()

    await supertest(app)
        .get('/users')
        .expect(200)
        .then((response) => {
            // Check type and length
            expect(Array.isArray(response.body)).toBeTruthy()
        })
})
