const express = require("express")
const router = express.Router();

const PlayerDetailsController = require('../controllers/PlayerDetailsController');

router.post('/players-details-create', PlayerDetailsController.addPlayerDetils);

// router.get('/players-list', PlayerDetailsController.getPlayer);
        
module.exports = router;