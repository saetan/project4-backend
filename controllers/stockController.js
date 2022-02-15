const express = require('express')
const app = express()
const Stock = require('../models/StockModel')

app.use((req, res, next) => {
    console.log('StockController: Middleware Check Activated')
    console.log('Request Information: current user role is: ', req.session.role)
    try {
        if (req.session.role !== 'admin') {
            res.status(401).send({
                status: 401,
                result: 'Failed, user is not authorised to access this',
            })
            return
        }
    } catch (error) {
        console.log('Error occurs in StockController Middleware')
    }
    next()
})

/* 
    Create NEW STOCK
*/

app.post('/createstock', async (req, res) => {
    console.log(req.body)
    try {
        const stock = await Stock.create(req.body)
        res.status(200).send({
            status: 200,
            result: 'success',
            data: stock,
        })
    } catch (error) {
        console.log(error.message)
        console.log(error.code)
        if (error.code == 11000) {
            let re = /\{(.*?)\}/g
            let duplicatedVariable = re.exec(error.message)
            let duplicatedError = `Duplicate Entries on ${duplicatedVariable[1]}`
            res.status(401).send({
                status: 401,
                message: duplicatedError,
            })
            return
        }
        res.status(401).send(error.message)
    }
})

/*
    GET STOCKS LIST
*/
app.get('/', async (req, res) => {
    try {
        const stocks = await Stock.find()
        console.log(stocks)
        res.send({
            status: 200,
            result: 'success',
            data: stocks,
        })
    } catch (error) {
        res.status(401).send(error.message)
        console.log(error.message)
    }
})

/*
    EDIT OF STOCK

*/
app.get('/:id', async (req, res) => {
    try {
        const stock = await Stock.findById({ _id: req.params.id })
        res.status(200).send({
            status: 200,
            message: 'Success',
            data: stock,
        })
    } catch (error) {
        res.status(401).send({
            status: 401,
            message: error.message,
        })
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
        console.log('User Controller: Trying to delete an stock')
        const stock = await Stock.findOneAndDelete({ _id: req.params.id })
        console.log(stock)
        res.send({
            status: 200,
            message: `Delete Successful, Stock ${stock.name} has been deleted`,
        })
    } catch (error) {
        console.log('Delete Stock Controller Error: ' + error.message)
        res.status(401).send({ status: 401, message: error.message })
    }
})

module.exports = app
