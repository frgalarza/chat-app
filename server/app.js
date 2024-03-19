const express = require('express')
const app = express()
const cors = require('cors')
const connection = require('./db_conn')
const { UserModel } = require('./Models/UserModel')
const { Server } = require('socket.io')
const { createServer } = require('http')
const httpServer = createServer(app)
const io = new Server(httpServer)

app.use(cors())

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Controll-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
    next()
})

app.use(express.json())

const obj = {}
io.on('connection', (socket)=>{

    socket.on('createConnection', (userId)=>{
        obj[userId] = socket.id
    })

    socket.on('chatMsg', async (msg, receiverId, senderId) => {
        let newMsg = {msg, receiverId, senderId}

        await UserModel.updateOne(
            { _id: senderId }, 
            { $push: {chats: newMsg} }
        )

        await UserModel.updateOne(
            { _id: receiverId },
            { $push: { chats: newMsg } }
        )

        io.to(obj[receiverId].emit('received msg', msg, senderId))

        socket.on('disconnect', ()=>{
            console.log('User disconnected');
        })
    })
})

module.exports = httpServer
