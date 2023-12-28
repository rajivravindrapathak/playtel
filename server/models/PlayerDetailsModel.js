const mongoose = require("mongoose");

const playerDetailsSchema = new mongoose.Schema({

    // players
    players: {
        id: { type: String },
        user_id: { type: String },
        first_name: { type: String },
        last_name: { type: String },
        refer_code: { type: String }, // "4MbTDO",
        join_code: { type: String }, // "",
        no_of_participate: { type: String }, //"0",
        no_of_loose: { type: String }, // "0",
        no_of_total_win: { type: String }, // 0,
        no_of_2win: { type: String }, // "0",
        no_of_4win: { type: String }, //"0",
        device_type: { type: String }, // "android",
        device_token: { type: String }, //"ebYxffXDQo6C5IFW0zINlO:APA91bGnQ4ZmopJkpxJ9Qj_ZzlmF1LG_Kr5rvyH-TU3yIzlLQq4pO12dSrKnlGTV-ueEA96vWM4n_52unAEzVRwgqOlsBWKVbCcWKwoUdWTmqr5civsT4KfOzvgytcazlbulz_CaIIQe",
        profile_url_image: { type: String }, // "",
        profile_image: { type: String }, //"26-10-2023-14-062114profile.jpg",
        // "aadhar_card": null,
        // "adhaar_card_back": null,
        // "pan_card": null,
        // "gender": null,
        // "banned": 0,
        // "mobile": null,
        // "state": null,
        // "district": null,
        // "address": null,
        // "pincode": null,
        // "created_at": "2023-10-24T05:20:29.000000Z",
        // "updated_at": "2023-12-21T14:14:23.000000Z"
    },

    user: {
        id: { type: String }, // 2114,
        first_name:  { type: String }, //"Ankit",
        email:  { type: String }, //"pqrs@gmail.com",
        // email_verified_at: null,
        mobile_no:  { type: String }, // "8178365653,
        user_type:  { type: String }, // 2,
        agent_approved:  { type: String }, // 0,
        status:  { type: String }, // 1,
        // "created_at": "2023-10-24T05:20:29.000000Z",
        // "updated_at": "2023-12-28T11:37:16.000000Z",
        last_login: { type: String } // "2023-12-28 17:07:16"
    },

    mobile: { type: String }, // "8178365653",

    wallet: {
      id: { type: String }, // 1798,
      player_id: { type: String }, // 19,
      wallet_ref_number: { type: String }, // "8178365653",
      total_amt_load: { type: String }, // 140010,
      total_amt_withdraw: { type: String }, // 187,
      current_amount: { type: String }, // 139833,
      winning_amount: { type: String }, //  0,
      no_of_load: { type: String }, // "3",
      no_of_withdraw: { type: String }, // "12",
      last_withdraw_date: { type: String }, // "2023-12-21",
      last_load_date: { type: String }, // "2023-11-04",
    //   "created_at": "2023-10-24T05:20:29.000000Z",
    //   "updated_at": "2023-12-21T13:02:42.000000Z"
    },

    bonus_wallet: {
        id: { type: String }, // 1798,
        player_id: { type: String }, // 19,
        bonus_wallet_ref_number: { type: String }, // "8178365653",
        total_amt_added: { type: String }, // 0.5,
        total_amt_used: { type: String }, // 1.74,
        current_amount: { type: String }, // -1.24,
        last_used_date: { type: String }, // 2023-11-24,
        // last_added_date: null,
        // "created_at": "2023-10-24T05:20:29.000000Z",
        // "updated_at": "2023-11-24T05:37:17.000000Z"
      },
      
    //   "coupon": null,

      app: {
        id: { type: String }, // 5,
        version_control: { type: String }, // 1.0,
        app_link: { type: String }, // https://ksbminfotech.com,
        joining_link: { type: String }, //  https://ludokhiladi.com/agent/link,
        // "created_at": "2021-01-17T13:07:53.000000Z",
        // "updated_at": "2023-11-14T09:28:43.000000Z"
      },

      bot: {
        id: { type: String }, // 5,
        boat_status: { type: String }, // 1,
        boat_complexity: { type: String }, // 1,
        // "created_at": "2021-01-17T13:04:28.000000Z",
        // "updated_at": "2023-10-11T08:09:39.000000Z"
      },

      total_refer_earning: { type: String }, // 0,
      total_earning: { type: String }, // 70000

}, 
// {
//     timestamps: true
// }
);

const PlayerDetailsModel = mongoose.model("playerDetails", playerDetailsSchema);

module.exports = { PlayerDetailsModel };