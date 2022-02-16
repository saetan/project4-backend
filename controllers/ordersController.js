const express = require('express')
const bcrypt = require('bcrypt')
const OutgoingOrders = require('../models/OutgoingOrderModel')
require('dotenv').config()
const app = express()

console.log('Outgoing Controllers Activated')
app.get('/outgoing', async (req, res) => {
    console.log('Order Controllers: Getting Outgoing orders')
    try {
        console.log('Retrieving Outgoing orders')
        const outgoingOrders = await OutgoingOrders.find()
        if (outgoingOrders) {
            console.log('Retrieval of outgonig orders successful')
            res.status(200).send({
                status: 200,
                data: outgoingOrders,
                message: 'success',
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})

app.post('/outgoing', async (req, res) => {
    console.log('Order Controllers: Creating outgoing order')
    try {
        console.log(req.body)
        const order = await OutgoingOrders.create(req.body)
        if (order) {
            console.log(
                'Order Controllers: Outgoing orders created successfully'
            )
            res.status(200).send({
                status: 200,
                result: 'success',
                data: order,
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})

app.delete('/outgoing/:id', async (req, res) => {
    try {
        console.log('User Controller: Trying to delete an user')
        const outgoingOrder = await OutgoingOrders.findOneAndDelete({
            _id: req.params.id,
        })
        console.log(
            `Delete Successful, User ${outgoingOrder.orderId} has been deleted`
        )
        res.status(200).send({
            status: 200,
            message: `Delete Successful, User ${outgoingOrder.orderId} has been deleted`,
        })
    } catch (error) {
        console.log('Delete User Controller Error: ' + error.message)
        res.status(401).send({
            status: 401,
            message: error.message,
        })
    }
})

module.exports = app
