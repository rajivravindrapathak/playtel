const { TransactionModel } = require("../models/TransactionModel");


exports.addTransaction = async function (req, res) {
    try {
        const { playerId, amount, txnDateTime, type, txnBy } = req.body;

        // Create a new instance of the TournamentModel
        const newTransaction = new TransactionModel({
            playerId, 
            amount, 
            txnDateTime,
            type, 
            txnBy,
            // notes,
            // walletType
        });

        // Save the new tournament to the database
        const savedTransaction = await newTransaction.save();

        // Respond with the saved tournament data
        res.status(201).json(savedTransaction);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.getTransaction = async function (rea, res) {
    try {
        // Fetch all tournament from the database
        const transaction = await TransactionModel.find();

        // Respond with the list of tournament
        res.status(200).json({ msg: 'sucessfull', transaction });  
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
}
