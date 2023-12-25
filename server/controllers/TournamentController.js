const { TournamentModel } = require("../models/TournmentModel");

exports.addTorunment = async function (req, res) {
    try {
        const { tournamentName, betAmount, noPlayers, tournamentInterval } = req.body;

        // Create a new instance of the TournamentModel
        const newTournament = new TournamentModel({
            tournamentName,
            betAmount,
            noPlayers,
            tournamentInterval,
        });

        // Save the new tournament to the database
        const savedTournament = await newTournament.save();

        // Respond with the saved tournament data
        res.status(201).json({msg: "add tournament data successfuly", savedTournament, status: "success"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.getTorunment = async function (req, res) {
    try {
        // Fetch all tournament from the database
        const tournament = await TournamentModel.find();

        // Respond with the list of tournament
        res.status(200).json({ msg: 'sucessfull', tournament });  
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
}

// update tournament
exports.updateTournament = async function(req, res){
    try {
        const  tournamentId  = req.body.tournamentId;
        const { tournamentName, betAmount, noPlayers, tournamentInterval } = req.body;

        // Find the tournament by ID
        let tournament = await TournamentModel.findById(tournamentId);

        if(tournament) {
            // Update the tournament field
            tournament.tournamentName = tournamentName;
            tournament.betAmount = betAmount;
            tournament.noPlayers = noPlayers;
            tournament.tournamentInterval = tournamentInterval;
            await tournament.save();
    
            return res.status(200).json({ success: true, message: 'tournament updated successfully.', tournamentId: tournament._id, status: 'success' });
        } else {
            return res.status(400).json({ success: false, message: 'tournament not found.' });
        }
    } catch (error) {
        console.error('Error updating tournament details:', error);
        res.status(500).json({ success: false, message: 'Failed to update tournament details .', error: error.message });
    }
};

//delete tournament
exports.deleteTorunment = async function (req, res) {
    
    try {
        const tournamentId = req.body.tournamentId

        const deletedTournaments = await TournamentModel.findByIdAndDelete(tournamentId);     

        if(!deletedTournaments) {
            return res.status(404).json({ status: 'error', msg: 'tournaments not found' });
        }

        return res.status(200).json({ status: 'success', msg: 'tournaments deleted successfully', deletedTournaments });
    } catch (error) {  
        console.error(error);
        return res.status(500).json({ status: 'error', msg: 'Internal server error', error });
    }
}


