const { PlayerModel } = require("../models/PlayerModel");
const multer = require('multer')
const configMulter = require('../configMulter')

const uploadAadhar = configMulter('aadharImage/', [
    { name: 'aadhar', maxCount: 1 }
]);

// exports.addPlayer = async function (req, res) {
//     uploadAadhar(req, res, async function (err) {
//         if(err instanceof multer.MulterError) {
//             return res.status(500).json({ success: false, message: 'Multer error', error: err });
//         } else if (err) {
//             return res.status(500).json({ success: false, message: 'Error uploading file', error: err });
//         }
//         try {
//             const { playId, name, email, mobileNo } = req.body;

//             // const aadharFile = req.files && req.files['aadhar'] ? req.files['aadhar'][0] : null;
//             // if(!aadharFile) {
//             //     return res.status(400).json({ success: false, message: 'Aadhar file not provided' });
//             // }
//             // const aadhar = aadharFile.path.replace(/^.*aadharImage[\\/]/, 'aadharImage/');

//             // const aadharFile = req.files && req.files['aadhar'] ? req.files['aadhar'][0] : null;
//             // const aadhar = aadharFile ? aadharFile.path.replace(/^.*aadharImage[\\/]/, 'aadharImage/') : '';

//             const aadhar = req.files['aadhar'] ? req.files['aadhar'][0].path.replace(/^.*aadharImage[\\/]/, 'aadharImage/') : '';
            
//             const newPlayer = new PlayerModel({ 
//                 playId,
//                 name,
//                 email,
//                 mobileNo,
//                 aadhar // Make sure to add aadhar to the model
//             });

//             // Save the new Player to the database
//             const savedPlayer = await newPlayer.save();
//             console.log(savedPlayer);
//             // Respond with the saved Player data
//             res.status(201).json({ status: 'success', savedPlayer });
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ message: 'Internal Server Error' });
//         }
//     }); // Add a closing parenthesis here
// };

exports.addPlayer = async function (req, res) {
    try {
        const { playId, aadhar, name, email, mobileNo } = req.body;
        // const { aadhar } = req.file;
        // Create a new instance of the PlayerModel
        // const base64Data = req.file.buffer.toString('base64');
        const newPlayer = new PlayerModel({
            playId, 
            name, 
            email, 
            aadhar, 
            mobileNo
        });
       

        // Save the new Player to the database
        const savedPlayer = await newPlayer.save();
        console.log(savedPlayer);
        // Respond with the saved Player data
        res.status(201).json({ status: 'success', savedPlayer});
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

