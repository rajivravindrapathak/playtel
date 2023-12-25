const express = require("express")
const router = express.Router();

const userController = require('../controllers/UserControllers');
const { authentication } = require("../middleware/authentication");

router.post('/signup', userController.signUp)
router.post('/login', authentication, userController.login);


module.exports = router;
