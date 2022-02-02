const express = require('express')
const app = express()
const Stock = require('../models/StockModel')

app.post('/createstock', async (req, res) => {
    console.log(req.body)
    try {
        const stock = await Stock.create(req.body)
        res.send(stock)
    } catch (error) {
        res.status(401).send(error.message)
        console.log(error.code)
    }
})
