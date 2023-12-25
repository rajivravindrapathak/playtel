const mongoose = require('mongoose')

const TournamentSchema = mongoose.Schema({
    tournamentName: { type: String, required: true }, 
    betAmount: { type: String, required: true }, 
    noPlayers: { type: String, required: true }, 
    tournamentInterval: { type: String, required: true }, 
})

const TournamentModel = mongoose.model('tournament', TournamentSchema)

module.exports = { TournamentModel }