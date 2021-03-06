const express = require('express')
const app = express()
const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

/* Middleware Check */
app.use((req, res, next) => {
    console.log('StockController: Middleware Check Activated')
    console.log('Request Information: current user role is: ', req.session.role)
    try {
        if (req.session.role !== 'admin') {
            console.log('User is not admin')
            res.status(401).send({
                status: 401,
                result: 'Failed, user is not authorised to access this',
            })
            return
        }
    } catch (error) {
        console.log('Error occurs in StockController Middleware')
    }
    next()
})

/* 
    CREATE  NEW USER
*/
app.post('/new', async (req, res) => {
    console.log(req.body)
    try {
        const user = await User.create(req.body)
        console.log(user)
        res.status(200).send({
            status: 200,
            message: 'Success',
            data: user,
        })
    } catch (error) {
        if (error.code == 11000) {
            res.status(401).send({
                status: 401,
                message: 'Failed, user already exists',
            })
            return
        }
        res.status(401).send(error.message)
        console.log(error.code)
        return
    }
})

/* 
    CREATE  A List OF USER
*/
app.get('/', async (req, res) => {
    console.log('User Controller: Trying to get users')
    console.log(req.context)
    try {
        const users = await User.find()
        console.log(users)
        res.send({
            status: 200,
            message: 'success',
            data: users,
        })
    } catch (err) {
        res.status(500).send(
            'Unexpected error has occured while retreiving users'
        )
        return
    }
})

/*
    Get a single user
*/

/* 
    GET A USER
*/
app.get('/:id', async (req, res) => {
    try {
        const user = await User.findById({ _id: req.params.id })
        res.status(200).send({
            status: 200,
            message: 'Success',
            data: user,
        })
    } catch (error) {
        res.status(401).send({
            status: 401,
            message: error.message,
        })
    }
})

/* 
    DELETE ONE USER
*/

app.delete('/:id', async (req, res) => {
    try {
        console.log('User Controller: Trying to delete an user')
        const user = await User.findOneAndDelete({ _id: req.params.id })
        console.log(`Delete Successful, User ${user.username} has been deleted`)
        res.status(200).send({
            status: 200,
            message: `Delete Successful, User ${user.username} has been deleted`,
        })
    } catch (error) {
        console.log('Delete User Controller Error: ' + error.message)
        res.status(401).send({
            status: 401,
            message: error.message,
        })
    }
})

/* 
    EDIT A USER
*/
app.put('/:id', async (req, res) => {
    try {
        // const user = await User.updateOne({ _id: req.params.id }, req.body, {
        //     new: true,
        //     rawResult: true,
        // })
        const user = await User.findById({ _id: req.params.id })
        if (user) {
            if (req.body.username) {
                if (req.body.username !== user.username) {
                    user.username = req.body.username
                }
            }

            if (req.body.email) {
                if (req.body.email !== user.email) {
                    user.email = req.body.email
                }
            }

            if (req.body.type) {
                if (req.body.type !== user.type) {
                    user.type = req.body.type
                }
            }

            if (req.body.password) {
                console.log('inside password: ' + req.body.password)
                console.log(
                    'Comparing password: ' +
                        req.body.password +
                        ' ' +
                        user.password
                )
                if (req.body.password !== user.password) {
                    console.log('Setting password')
                    user.password = req.body.password
                }
            }

            console.log('Updated User: ' + user)
            await user.save()
        }
        res.status(200).send({
            status: 200,
            message: 'Success',
            data: user,
        })
        console.log(user)
    } catch (error) {
        res.status(401).send({ status: 401, message: error.message })
    }
})

module.exports = app
