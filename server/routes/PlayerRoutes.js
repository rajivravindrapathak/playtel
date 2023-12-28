const express = require("express")
const router = express.Router();
const multer = require('multer')

const PlayerController = require('../controllers/PlayerController');

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/documents/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

// const upload = multer({
//     storage,
//     limits: {
//         fileSize: 1024 * 1024 * 5,  // 5 MB limit (adjust as needed)
//     },
// }).single('aadhar');

const upload = multer({ storage }).single('aadhar')

router.post('/players-create', upload, PlayerController.addPlayer);

// router.post('/players-create', PlayerController.addPlayer);

router.get('/players-list', PlayerController.getPlayer);

router.post('/update-players', PlayerController.updatePlayer);

router.post('/delete-players-data', PlayerController.deletePlayer);

        
module.exports = router;