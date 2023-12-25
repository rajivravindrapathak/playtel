const express = require("express")
const router = express.Router();

const PlayerController = require('../controllers/PlayerController');


router.post('/players-create', PlayerController.addPlayer);

router.get('/players-list', PlayerController.getPlayer);

router.post('/update-players', PlayerController.updatePlayer);

router.post('/delete-players-data', PlayerController.deletePlayer);

        
module.exports = router;