const express = require("express")
const router = express.Router();

const tournamentController = require('../controllers/TournamentController');


router.post('/tournaments-create', tournamentController.addTorunment);

router.get('/tournaments-list', tournamentController.getTorunment);

// router.post('/update-user-tournaments', tournamentController.updateTorunment);
router.post('/update-tournament', tournamentController.updateTournament)

router.post('/delete-tournaments-data', tournamentController.deleteTorunment);

// router.get('/get-tournament-list', tournamentController.getTournamnetList);

module.exports = router;
