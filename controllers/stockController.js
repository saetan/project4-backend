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

app.put('/:id', async (req, res) => {})

/*
    UPDATE OF CURRENT STOCK
*/
module.exports = app
