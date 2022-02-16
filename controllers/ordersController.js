const express = require('express')
const bcrypt = require('bcrypt')
const OutgoingOrders = require('../models/OutgoingOrderModel')
const IncomingOrders = require('../models/IncomingOrderModel')
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
        console.log('Order Controller: Trying to delete an Order')
        const outgoingOrder = await OutgoingOrders.findOneAndDelete({
            _id: req.params.id,
        })
        console.log(
            `Delete Successful, Order ${outgoingOrder.orderId} has been deleted`
        )
        res.status(200).send({
            status: 200,
            message: `Delete Successful, Order ${outgoingOrder.orderId} has been deleted`,
        })
    } catch (error) {
        console.log('Delete Order Controller Error: ' + error.message)
        res.status(401).send({
            status: 401,
            message: error.message,
        })
    }
})

app.get('/incoming', async (req, res) => {
    console.log('Order Controllers: Getting Incoming orders')
    try {
        console.log('Retrieving Incoming orders')
        const incomingOrders = await IncomingOrders.find()
        if (incomingOrders) {
            console.log('Retrieval of outgonig orders successful')
            res.status(200).send({
                status: 200,
                data: incomingOrders,
                message: 'success',
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})

app.post('/incoming', async (req, res) => {
    console.log('Order Controllers: Creating outgoing order')
    try {
        console.log(req.body)
        const order = await IncomingOrders.create(req.body)
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

app.delete('/incoming/:id', async (req, res) => {
    try {
        console.log('OrderController: Trying to delete an Order')
        const incomingOrder = await IncomingOrders.findOneAndDelete({
            _id: req.params.id,
        })
        console.log(
            `Delete Successful, Order ${incomingOrder.orderId} has been deleted`
        )
        res.status(200).send({
            status: 200,
            message: `Delete Successful, Order ${incomingOrder.orderId} has been deleted`,
        })
    } catch (error) {
        console.log('Delete Order Controller Error: ' + error.message)
        res.status(401).send({
            status: 401,
            message: error.message,
        })
    }
})

module.exports = app
