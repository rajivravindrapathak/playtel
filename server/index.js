const express = require('express')
const cors = require('cors')

const http = require("http")
const { Server } = require("socket.io");

const { connection } = require('./config/db')
const userRoutes  = require('./routes/UserRoutes')
const PlayerRoutes  = require('./routes/PlayerRoutes')
const tournamentRoutes  = require('./routes/TournamentRoutes')
const transactionRoutes  = require('./routes/TransactionRoutes')
const noticeRoutes = require('./routes/NoticeRoutes')     


require("dotenv").config()

const app = express()
const server = http.createServer(app)
const io = new Server(server)

// Socket.io connection
io.on('connection', (socket) => {
    // console.log('A new user has connected', socket.id);

    // message coming from user
    socket.on("user-message", (message) => {
        console.log("A New User Message", message)
        // send to all
        io.emit("message", message)   
    })

    // Handle socket events here
    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
    });
});

// only for check index.html file
const path = require('path')
app.use(express.static(path.resolve("./public")))
app.get('/', (req, res) => {
    return res.sendFile('/public/index.html')
})

const PORT = process.env.PORT || 2001       

app.use(express.json())  
app.use(cors()) 

// define api Routes
app.use('/user', userRoutes)
app.use('/player', PlayerRoutes)
app.use('/tournament', tournamentRoutes)   
app.use('/transaction', transactionRoutes)  
app.use('/notice', noticeRoutes) 

server.listen(PORT, async() => {
    try {
        await connection
        console.log(`connected to db`)
    } catch (error) {
        console.log(`not connected to db`)
        console.log(error)
    }
    console.log(`listening on ${PORT}`)
})   

