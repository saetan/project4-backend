const mongoose = require('mongoose')
const Schema = mongoose.Schema

const stockSchema = new Schema(
    {
        skuID: {
            type: String,
            unique: true,
            required: true,
            autoIndex: true,
            // useCreateIndex: true,
        },
        name: {
            type: String,
            unique: true,
            required: true,
            autoIndex: true,
            // useCreateIndex: true,
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
        category: {
            type: String,
            required: true,
            default: 'Uncategories',
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('stock', stockSchema)
