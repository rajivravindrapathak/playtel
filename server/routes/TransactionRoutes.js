const express = require("express")
const router = express.Router();

const TransactionController = require('../controllers/TransactionController');

router.post('/transaction-create', TransactionController.addTransaction);

router.get('/transaction-list', TransactionController.getTransaction);

module.exports = router;
