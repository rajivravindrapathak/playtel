const express = require('express')
const cors = require('cors')

const http = require("http")
const { Server } = require("socket.io");

const playerDetailsController = require('./controllers/PlayerDetailsController')

const { connection } = require('./config/db')
const userRoutes = require('./routes/UserRoutes')
const adminRoutes  = require('./routes/AdminRoutes')
const PlayerRoutes  = require('./routes/PlayerRoutes')
const playerDetailsRoutes = require('./routes/playerDetailsRoutes')
const tournamentRoutes  = require('./routes/TournamentRoutes')
const transactionRoutes  = require('./routes/TransactionRoutes')
const noticeRoutes = require('./routes/NoticeRoutes')     

require("dotenv").config()

const app = express()
const server = http.createServer(app)
// const io = new Server(server)


// // Socket.io connection
// io.on('connection', (socket) => {
//     // console.log('A new user has connected', socket.id);

//     // message coming from user
//     socket.on("user-message", (message) => {
//         console.log("A New User Message", message)
//         // send to all
//         io.emit("message", message)   
//     })

//     // Handle socket events here
//     socket.on('disconnect', () => {
//         console.log('User disconnected', socket.id);
//     });
// });

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    },
});

io.use((socket, next) => {
    if (socket.handshake.query.token === "UNITY") {
        next();
    } else {
        next(new Error("Authentication error"));
    }
});

app.get('/', (req, res) => {
    // Send the WebSocket server URL as part of the response
    console.log('called');
    res.send("api is running")
    
    // Set a timeout for a specific event
    // const timeoutDuration = 5000; // 5 seconds in milliseconds
    // let eventTimeout;
    io.on('connection', (socket) => {
        console.log('User Connected');

        // Listen for connection error
        socket.on('error', (error) => {
            console.error('Connection error:', error);
        });


        // // message coming from user
        // socket.on("user-message", (message) => {
        //     console.log("A New User Message", message)
        //     // send to all
        //     io.emit("message", message)   
        // })
    
        ChatController.sendChatMessage(io, socket);
        playerDetailsController(io, socket)

        socket.on('disconnect', () => {
            console.log('User disconnected');
            // clearTimeout(eventTimeout); // Clear the timeout when the user disconnects
        });
    });

});

// // only for check index.html file
// const path = require('path')
// app.use(express.static(path.resolve("./public")))
// app.get('/', (req, res) => {
//     return res.sendFile('/public/index.html')
// })


const PORT = process.env.PORT || 2001       

app.use(express.urlencoded({limit: '25mb', extended: true}));
app.use(express.json())  
app.use(cors()) 
// Increase the payload limit (e.g., 10MB)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// define api Routes
app.use('/user', userRoutes)
app.use('/admin', adminRoutes)
app.use('/player', PlayerRoutes)
app.use('/playerdetails', playerDetailsRoutes)
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

