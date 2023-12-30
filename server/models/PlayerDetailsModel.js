const mongoose = require("mongoose");
const PlayerModel = require('../models/PlayerModel')
const UserModel = require('../models/UserModel')

const playerDetailsSchema = new mongoose.Schema({

    playerId: {type: mongoose.Schema.ObjectId, ref: 'PlayerModel' },

    userID: {type: mongoose.Schema.ObjectId, ref: 'UserModel'}
    
    // // players
    // players: {
    //     id: { type: String },
    //     user_id: { type: String },
    //     first_name: { type: String },
    //     last_name: { type: String },
    //     refer_code: { type: String },
    //     join_code: { type: String }, 
    //     no_of_participate: { type: String }, 
    //     no_of_loose: { type: String }, 
    //     no_of_total_win: { type: String }, 
    //     no_of_2win: { type: String }, 
    //     no_of_4win: { type: String },
    //     device_type: { type: String }, 
    //     device_token: { type: String }, 
    //     profile_url_image: { type: String }, 
    //     profile_image: { type: String }, 
    // },

    // // user
    // user: {
    //     first_name:  { type: String },
    //     email:  { type: String }, 
    //     mobile_no:  { type: String }, 
    //     user_type:  { type: String }, 
    //     agent_approved:  { type: String }, 
    //     status:  { type: String }, 
    //     last_login: { type: String } 
    // },

    // mobile: { type: String }, 

    // // wallet
    // wallet: {
    //     id: { type: String }, 
    //     player_id: { type: String }, 
    //     wallet_ref_number: { type: String }, 
    //     total_amt_load: { type: String }, 
    //     total_amt_withdraw: { type: String }, 
    //     current_amount: { type: String }, 
    //     winning_amount: { type: String }, 
    //     no_of_load: { type: String }, 
    //     no_of_withdraw: { type: String }, 
    //     last_withdraw_date: { type: String }, 
    //     last_load_date: { type: String }
    // },

    // // bonus_wallet
    // bonus_wallet: {
    //     id: { type: String }, 
    //     player_id: { type: String }, 
    //     bonus_wallet_ref_number: { type: String }, 
    //     total_amt_added: { type: String },
    //     total_amt_used: { type: String }, 
    //     current_amount: { type: String }, 
    //     last_used_date: { type: String }, 
    // },
      
    // //   "coupon": null,

    // // app
    // app: {
    //     id: { type: String }, 
    //     version_control: { type: String }, 
    //     app_link: { type: String }, 
    //     joining_link: { type: String },
    // },

    // // bot
    // bot: {
    //     id: { type: String }, 
    //     boat_status: { type: String }, 
    //     boat_complexity: { type: String }, 

    // },

    // total_refer_earning: { type: String }, 
    // total_earning: { type: String },

}, 
// {
//     timestamps: true
// }
);

const PlayerDetailsModel = mongoose.model("playerDetails", playerDetailsSchema);

module.exports = { PlayerDetailsModel };