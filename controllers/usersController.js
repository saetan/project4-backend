const express = require('express')
const app = express()
const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.post('/new', async (req, res) => {
    console.log(req.body)
    try {
        const user = await User.create(req.body)
        console.log(user)
        res.send(user)
    } catch (error) {
        if (error.code == 11000) {
            res.status(401).send(
                'Username already exist please try another username'
            )
            return
        }
        res.status(401).send(error.message)
        console.log(error.code)
        return
    }
})

//verify jwt
app.use((req, res, next) => {
    console.log('UserController: Middleware Check Activated')
    console.log('Request Information: ', req.headers.token)
    if (!req.headers.token) {
        res.status(401).send('Unauthenticated,no token, Please Login')
        return
    }
    try {
        const payload = jwt.verify(req.headers.token, process.env.SECRET)
        console.log('current payload', payload)
        if (payload.role !== 'admin') {
            console.log('UserController.js: User is not admin')
            res.status(401).send('User is not admin, Unauthourized users')
            return
        }
        req.context = payload
        next()
    } catch (err) {
        console.log('error message caught in user controller: ', err)
        res.status(401).send('Expired or Invalid Token, Please Login')
        return
    }
})

app.get('/', async (req, res) => {
    console.log('User Controller: Trying to get users')
    console.log(req.context)
    try {
        const users = await User.find()
        console.log(users)
        res.send(users)
    } catch (err) {
        res.status(500).send(
            'Unexpected error has occured while retreiving users'
        )
        return
    }
})

app.delete('/:id', async (req, res) => {
    try {
        console.log('User Controller: Trying to delete an user')
        const user = await User.findOneAndDelete({ _id: req.params.id })
        res.send(`This ${user.username} has been deleted`)
    } catch (error) {
        console.log('Delete User Controller Error: ' + error.message)
    }
})

app.put('/:id', async (req, res) => {
    const user = await User.updateOne({ _id: req.params.id }, req.body, {
        new: true,
    })
    res.send(user)
})

module.exports = app
