const express = require('express')
const app = express()
const Stock = require('../models/StockModel')

/* 
    Create NEW STOCK
*/
app.post('/createstock', async (req, res) => {
    console.log(req.body)
    try {
        const stock = await Stock.create(req.body)
        res.send(stock)
    } catch (error) {
        res.status(401).send(error.message)
        console.log(error)
    }
})

/*
    GET STOCKS LIST
*/
app.get('/', async (req, res) => {
    try {
        const stocks = await Stock.find()
        console.log(stocks)
        res.send(stocks)
    } catch (error) {
        res.status(401).send(error.message)
        console.log(error.message)
    }
})

/*
    UPDATE OF CURRENT STOCK
*/

app.put('/:id', async (req, res) => {
    try {
        const stock = await Stock.updateOne({ _id: req.params.id }, req.body, {
            new: true,
        })
        res.send(stock)
    } catch (error) {
        res.status(401).send(error.message)
    }
})

/*
    Delete OF CURRENT STOCK
*/

app.delete('/:id', async (req, res) => {
    try {
        console.log('User Controller: Trying to delete an user')
        const stock = await Stock.findOneAndDelete({ _id: req.params.id })
        res.send(`Delete Successful, Stock ${stock.name} has been deleted`)
    } catch (error) {
        console.log('Delete User Controller Error: ' + error.message)
        res.status(401).send(error.message)
    }
})

module.exports = app
