const express = require('express')
const bcrypt = require('bcrypt')
const OutgoingOrders = require('../models/OutgoingOrderModel')
const IncomingOrders = require('../models/IncomingOrderModel')
const Stocks = require('../models/StockModel')
require('dotenv').config()
const app = express()

console.log('Outgoing Controllers Activated')

/* Outgoing */

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

//get one
app.get('/outgoing/:id', async (req, res) => {
    console.log('Get Single Order Triggered!')
    try {
        const order = await OutgoingOrders.findById({ _id: req.params.id })
        if (order) {
            console.log('Retrieved single order: ' + order)
            console.log('Success')
            res.status(200).send({
                status: 200,
                message: 'Success',
                data: order,
            })
        }
    } catch (error) {
        res.status(401).send({
            status: 401,
            message: error.message,
        })
    }
})

//edit outgoing
app.put('/outgoing/:id', async (req, res) => {
    console.log('outgoing PUT triggered')
    try {
        const order = await OutgoingOrders.updateOne(
            { _id: req.params.id },
            req.body,
            {
                new: true,
            }
        )
        if (order) {
            console.log('Edited Incoming Data: ' + order)
            res.status(200).send({
                status: 200,
                data: order,
                message: 'Success',
            })
        }
    } catch (error) {
        res.status(401).send(error.message)
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

//handle outgoing completed
app.post('/outgoing/completed/:id', async (req, res) => {
    console.log('Inside Order Controller: Incoming approved middleware')
    const filter = { skuID: req.body.skuID }
    console.log(req.body)
    try {
        console.log('Finding req.body.skuID in Stock')
        const currentStock = await Stocks.findOne(filter)
        if (currentStock) {
            try {
                console.log('stockFound: ' + currentStock)
                console.log('Proceed to add quanity')
                currentStock.quantity -= req.body.quantity
                console.log(currentStock)
                currentStock.save()
                res.status(200).send({
                    status: 200,
                    message: `Successfully updated ${currentStock.stockName}`,
                })
            } catch (error) {
                console.log(error.message)
            }
        }
    } catch (error) {
        console.log('error.message')
    }
})
/* Incoming */

//get a list
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

//get one
app.get('/incoming/:id', async (req, res) => {
    console.log('Get Single Order Triggered!')
    try {
        const order = await IncomingOrders.findById({ _id: req.params.id })
        if (order) {
            console.log('Retrieved single order: ' + order)
            console.log('Success')
            res.status(200).send({
                status: 200,
                message: 'Success',
                data: order,
            })
        }
    } catch (error) {
        res.status(401).send({
            status: 401,
            message: error.message,
        })
    }
})

//edit incoming
app.put('/incoming/:id', async (req, res) => {
    console.log('Incoming PUT triggered')
    try {
        const order = await IncomingOrders.updateOne(
            { _id: req.params.id },
            req.body,
            {
                new: true,
            }
        )
        if (order) {
            console.log('Edited Incoming Data: ' + order)
            res.status(200).send({
                status: 200,
                data: order,
                message: 'Success',
            })
        }
    } catch (error) {
        res.status(401).send(error.message)
    }
})

//create
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

//delete
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

//Increase stock through incoming and decrease through outgoing
app.post('/incoming/approved/:id', async (req, res) => {
    console.log('Inside Order Controller: Incoming approved middleware')
    const filter = { skuID: req.body.skuID }
    console.log(req.body)
    try {
        console.log('Finding req.body.skuID in Stock')
        const currentStock = await Stocks.findOne(filter)
        if (currentStock) {
            try {
                console.log('stockFound: ' + currentStock)
                console.log('Proceed to add quanity')
                currentStock.quantity += req.body.quantity
                console.log(currentStock)
                currentStock.save()
                res.status(200).send({
                    status: 200,
                    message: `Successfully updated ${currentStock.stockName}`,
                })
            } catch (error) {
                console.log(error.message)
            }
        }
    } catch (error) {
        console.log('error.message')
    }
})

module.exports = app
