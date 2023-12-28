const express = require("express")
const router = express.Router();

const userController = require('../controllers/UserController');
const { authentication } = require("../middleware/authentication");

router.post('/signup', userController.signUp)
router.post('/login', userController.login);


module.exports = router;
 