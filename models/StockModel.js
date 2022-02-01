const mongoose = require('mongoose')
const Schema = mongoose.Schema

const stockSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 0,
        },
        price: {
            type: Number,
            required: true,
            default: 0.0,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('stock', stockSchema)
