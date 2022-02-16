const mongoose = require('mongoose')
const Schema = mongoose.Schema

const outGoingOrderSchema = new Schema(
    {
        orderId: {
            type: String,
            required: true,
            unique: true,
        },

        skuID: {
            type: String,
            required: true,
        },

        stockName: {
            type: String,
            required: true,
        },

        quantity: {
            type: Number,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('outgoingOrder', outGoingOrderSchema)
