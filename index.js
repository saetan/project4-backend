const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = 3001


app.get('/', (req, res) => {
    console.log("uwu");
    res.send('Hello World!')
})

mongoose.connect("mongodb+srv://saetan:ilovebbt93@cluster0.1nhm8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority").then(async () => {
    console.log("Database Connected")
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
})
