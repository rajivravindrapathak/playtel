const { PlayerModel } = require("../models/PlayerModel");

exports.addPlayer = async function (req, res) {
    try {
        const { playId, name, email, aadhar, mobileNo } = req.body;

        // Create a new instance of the PlayerModel
        const newPlayer = new PlayerModel({
            playId, 
            name, 
            email, 
            aadhar, 
            mobileNo
        });

        // Save the new Player to the database
        const savedPlayer = await newPlayer.save();

        // Respond with the saved Player data
        res.status(201).json(savedPlayer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.getPlayer = async function (rea, res) {
    try {
        // Fetch all tournament from the database
        const player = await PlayerModel.find();

        // Respond with the list of player
        res.status(200).json({ msg: 'sucessfull', player });  
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
}

exports.updatePlayer = async function (req, res) {

    try {
        const playerId = req.body.playerId;
        const { playId, name, email, aadhar, mobileNo } = req.body;
    
        // Find the player by ID
        let player = await PlayerModel.findById(playerId);
    
        if(player) {
            // Update the player field
            player.playId = playId;   
            player.name = name;
            player.email = email;
            player.aadhar = aadhar;
            player.mobileNo = mobileNo
            await player.save();
    
            return res.status(200).json({ success: true, message: 'player updated successfully.', playerId: player._id, status: 'success' });
        } else {
            return res.status(400).json({ success: false, message: 'player not found.' });
        }
    } catch (error) {
        console.error('Error updating player details:', error);
        res.status(500).json({ success: false, message: 'Failed to update player details .', error: error.message });
    }
}

exports.deletePlayer = async function (req, res) {
    try {
        const playerId = req.body.playerId
    
        const deletedPlayers = await PlayerModel.findByIdAndDelete(playerId);     
    
        if(!deletedPlayers) {
            return res.status(404).json({ status: 'error', msg: 'Players not found' });
        }
    
        return res.status(200).json({ status: 'success', msg: 'Players deleted successfully', deletedPlayers });
    } catch (error) {  
        console.error(error);
        return res.status(500).json({ status: 'error', msg: 'Internal server error', error });
    }


}

