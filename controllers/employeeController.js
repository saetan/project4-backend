const express = require('express')
const app = express()
const Employee = require('../models/EmployeeModel')

/* 
    Create Employee
*/
app.post('/new', async (req, res) => {
    console.log(req.body)
    try {
        const employee = await Employee.create(req.body)
        res.send(employee)
    } catch (error) {
        res.status(401).send(error.message)
        console.log(error)
    }
})

/*
    GET Employee LIST
*/
app.get('/', async (req, res) => {
    try {
        const employees = await Employee.find()
        console.log(employees)
        res.send(employees)
    } catch (error) {
        res.status(401).send(error.message)
        console.log(error.message)
    }
})

/*
    UPDATE OF Employee
*/

app.put('/:id', async (req, res) => {
    try {
        const employee = await Employee.updateOne(
            { _id: req.params.id },
            req.body,
            {
                new: true,
            }
        )
        res.send(employee)
    } catch (error) {
        res.status(401).send(error.message)
    }
})

/*
    Delete OF Employee
*/

app.delete('/:id', async (req, res) => {
    try {
        console.log('User Controller: Trying to delete an user')
        const employee = await Employee.findOneAndDelete({ _id: req.params.id })
        res.send(`Delete Successful, Stock ${employee.name} has been deleted`)
    } catch (error) {
        console.log('Delete User Controller Error: ' + error.message)
        res.status(401).send(error.message)
    }
})

module.exports = app
