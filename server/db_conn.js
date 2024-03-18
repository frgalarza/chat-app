require('dotenv').config()
const mongoose = require('mongoose')
const { MONGO_URL } = process.env()

const connection = mongoose.connect(MONGO_URL)

module.exports = connection

