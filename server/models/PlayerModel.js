const mongoose = require('mongoose')

const playerSchema = mongoose.Schema({
    playId: { type: String, required: true }, 
    name: { type: String, required: true }, 
    email: { type: String, required: true }, 
    aadhar: { type: String, required: true }, 
    mobileNo: { type: Number, required: true }
})

const PlayerModel = mongoose.model('player', playerSchema)


module.exports = { PlayerModel }