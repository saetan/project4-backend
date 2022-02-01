const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        salary: {
            type: Number,
            required: true,
            default: 0.0,
        },
        address: {
            type: String,
            required: true,
        },
        contactNumber: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        joinedDate: {
            type: Date,
            required: true,
            default: Date.now(),
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('employee', employeeSchema)
