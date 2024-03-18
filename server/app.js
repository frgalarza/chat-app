const express = require('express')
const app = express()
const cors = require('cors')
const connection = require('./db_conn')

app.use(cors())

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Controll-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
    next()
})

app.use(express.json())

module.exports = app
