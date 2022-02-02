const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const emailValidator = require('../utilities/validateEmail')
const validateEmail = require('../utilities/validateEmail')
const SALT_WORK_FACTOR = 10

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        unique: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['admin', 'employee', 'customer', 'supplier'],
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validateEmail, 'Please fill in a valid email address'],
    },
})

userSchema.pre('save', function (next) {
    let user = this
    bcrypt.hash(user.password, SALT_WORK_FACTOR, (err, hash) => {
        if (err) return next(err)
        user.password = hash
        next()
    })
})

module.exports = mongoose.model('user', userSchema)
