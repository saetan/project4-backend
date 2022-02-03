const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/UserModel')
require('dotenv').config()
const app = express()

app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email,
        })
        if (!user) {
            console.log('Session Controller: Invalid Email')
            res.status(401).send({
                status: 401,
                message: 'Invalid Email',
            })
        }

        const isValid = await bcrypt.compare(req.body.password, user.password)
        if (!isValid) {
            console.log('Session Controller: Invalid Password')
            //unauthorised
            res.status(401).send({
                status: 401,
                message: 'Invalid Password',
            })
        }
        console.log(req.session.cookie)
        req.session.isAuth = true
        req.session.role = user.type
        req.session.userName = user.username
        res.status(200).send({
            status: 200,
            result: 'success',
            userName: user.username,
            role: user.type,
        })
    } catch (error) {
        console.log(error.message)
    }
})

app.post('/logout', (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) throw err
            res.status(200).send({ result: 'success' })
        })
    } catch (error) {
        res.status(401).send(error.message)
    }
})

module.exports = app
