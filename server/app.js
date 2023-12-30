const express = require('express')
const app = express();
const cors = require('cors')
const db = require("./config/db");

const userRoutes = require('./routes/UserRoutes')
const adminRoutes  = require('./routes/AdminRoutes')
const PlayerRoutes  = require('./routes/PlayerRoutes')
const playerDetailsRoutes = require('./routes/playerDetailsRoutes')
const tournamentRoutes  = require('./routes/TournamentRoutes')
const transactionRoutes  = require('./routes/TransactionRoutes')
const noticeRoutes = require('./routes/NoticeRoutes')     

require("dotenv").config()

const { createServer } = require("http");
const { Server } = require("socket.io");
const {initializeSocketIO } = require("./socket/service");
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

const PORT = process.env.PORT || 2001       

app.use(express.urlencoded({limit: '25mb', extended: true}));
app.use(express.json())  
app.use(cors()) 
// Increase the payload limit (e.g., 10MB)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

db();

// define api Routes
app.use('/user', userRoutes)
app.use('/admin', adminRoutes)
app.use('/player', PlayerRoutes)
app.use('/playerdetails', playerDetailsRoutes)
app.use('/tournament', tournamentRoutes)   
app.use('/transaction', transactionRoutes)  
app.use('/notice', noticeRoutes) 

io.use((socket, next) => {
  if(socket.handshake.query.token === "UNITY") {
      next();
  } else {
      next(new Error("Authentication error"));
  }
});

initializeSocketIO(io)

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;