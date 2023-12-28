const { PlayerDetailsModel } = require("../models/PlayerDetailsModel");


exports.addPlayerDetils = async function (req, res) {
    try {
        const playerDetails = new PlayerDetailsModel({

            players: req.body.players,

            user: req.body.user,

            mobile: req.body.mobile,

            wallet: req.body.wallet,

            bonus_wallet: req.body.bonus_wallet,

            app: req.body.app,
        
            bot: req.body.bot,
        
            total_refer_earning: req.body.total_refer_earning,

            total_earning: req.body.total_earning
        
        
        });
        
        await playerDetails.save();
        res.send({ msg: "Sucessfully stored in Database", playerDetailsdata: playerDetails });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}