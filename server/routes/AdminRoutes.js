const express = require("express")
const router = express.Router();

const adminController = require('../controllers/AdminController');
const { authentication } = require("../middleware/authentication");

router.post('/signup', adminController.signUp)
router.post('/login', adminController.login);


module.exports = router;
 