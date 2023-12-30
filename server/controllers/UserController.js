const { UserModel } = require('../models/UserModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

// exports.signUp = async function (req, res) {
//     const { mobile_no, email, first_name, device_type, device_token, user_type, password } = req.body

//     const isUser = await UserModel.findOne({ email })
//     if(isUser) {
//         res.send({ msg : "user already exits please login", isUser })
//     } else {
//         bcrypt.hash(password, 5, async function(err, hash) {
//             if(err) {
//                 res.send({ msg: "something went wrong, plz try again later", err })
//             } 
//             else {
//                 const user = new UserModel({ 
//                     mobile_no, 
//                     email, 
//                     first_name,
//                     device_type, 
//                     device_token, 
//                     user_type, 
//                     email,  
//                     password: hash
//                 })
//                 try {          
//                     await user.save()
//                     res.status(200).send({ msg: "signUp Successful", user })
//                 } catch (err) {
//                     console.log(err)
//                     res.send({ msg: "something went wrong, plz try again", err })
//                 }
//             }   
//         });
//     }   
// }

// // Generate a random OTP
// const generateOTP = () => {
//     return Math.floor(100000 + Math.random() * 900000).toString();
// };

// // login with otp
// exports.login = async function (req, res) {
//     const { mobile_no } = req.body;

//     const user = await UserModel.findOne({ mobile_no });
  
//     if(!user) {
//         return res.status(401).json({ msg: 'Invalid credentials' });
//     }
  
//     // const isPasswordValid = await bcrypt.compare(password, user.password);
  
//     // if(isPasswordValid) {
//     //   const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
//     //   return res.json({ msg: 'Login successful', token, userId: user._id });
//     // } else {
//     //   return res.status(401).json({ msg: 'Invalid credentials' });
//     // }
// };

// const UserModel = require('../models/UserModel'); // Import your user model
// const { sendOTP } = require('../utils/otp'); // Implement a function to send OTP


exports.userSignup = async function (req, res) {

    try {
        const { mobile_no, email, first_name, device_type, device_token, user_type, password } = req.body;
  
        // Validate required fields
        const missingFields = ['mobile_no', 'email', 'first_name', 'device_type', 'user_type', 'password']
          .filter(field => !req.body[field]);
  
        if(missingFields.length > 0) {
          return res.status(400).json({
            success: false,
            message: `Please provide ${missingFields.join(', ')}.`
          });
        }
  
        // const imagePath = req.files['image'] ? req.files['image'][0].path.replace(/^.*userImage[\\/]/, 'userImage/') : '';
  
        const existingUser = await UserModel.findOne({ mobile_no });
  
        if(existingUser) {
          return res.status(400).json({ success: false, isSignupCompleted: 1, message: 'user already exists.' });
        }
  
        const newUser = new UserModel({
          mobile_no, 
          email, 
          first_name, 
          device_type, 
          device_token, 
          user_type, 
          password,
         
        });
  
        await newUser.save();
  
        res.status(201).json({ success: true, isSignupCompleted: 1, message: 'user created successfully.', data: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ success: false, message: 'Failed to create user.', error: error.message });
    }
}; 



exports.userLogin = async function(req, res){
    try {
        const { mobile_no } = req.body;

        let user = await UserModel.findOne({ mobile_no });

        if(user) {
            // User already exists
            return res.status(200).json({  
                success: true, 
                status: 1, 
                user,
                message: 'User exists. Returning user data.' 
            });
        }

        // User doesn't exist
        return res.status(404).json({
            success: false,
            status: 0,
            message: 'User not found.'
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Login failed', error: error.message });
    }
};

// const generateRandomCode = async () => {
//     return Math.floor(1000 + Math.random() * 9000);
// }

// exports.userLogin = async function(req, res){
//     try {
//         const { mobile_no, device_token } = req.body;
//         const otp = await generateRandomCode()

//         let user = await UserModel.findOne({ mobile_no });

//         if(user) {
//             user.device_token = device_token;
//             user.otp = otp
//             await user.save();

//             return res.status(200).json({  status: 1, otp: otp, device_token, mobile_no, message: 'user exists. OTP provided.' });
//         }

//         user = new UserModel({ mobile_no, device_token, otp: otp, status: 1 });
//         await user.save();

//         res.status(200).json({success:true, status: 1, otp: otp, mobile_no, device_token, message: 'New user added. OTP provided.' });
//     } catch (error) {
//         console.error('Error during login:', error);
//         res.status(500).json({ success: false, message: 'Login failed', error: error.message });
//     }
// };

// // Listen for login event
// socket.on('login', async (loginData) => {
//     const { email, password } = loginData;

//     try {
//         const user = await UserModel.findOne({ email });

//         if (!user) {
//             // User not found
//             socket.emit('loginFailure', { message: 'Invalid credentials' });
//             return;
//         }

//         const isPasswordValid = await bcrypt.compare(password, user.password);

//         if(isPasswordValid) {
//             // Password is valid
//             const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
//             socket.data.user = user; // Store user information in the socket's data
//             socket.emit('loginSuccess', { message: 'Login successful', token, userId: user._id });

//             // Broadcast to all connected clients about the new user
//             io.emit('userConnected', { user });
//         } else {
//             // Invalid password
//             socket.emit('loginFailure', { message: 'Invalid credentials' });
//         }
//     } catch (error) {
//         console.error('Error during login:', error);
//         socket.emit('loginFailure', { message: 'An error occurred during login' });
//     }
// });

// // authController.js
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const { UserModel } = require('../models/UserModel');

// exports.handleLogin =  async function (socket, io, loginData) {
//     const { email, password } = loginData;

//     try {
//         const user = await UserModel.findOne({ email });

//         if (!user) {
//             socket.emit('loginFailure', { message: 'Invalid credentials' });
//             return;
//         }

//         const isPasswordValid = await bcrypt.compare(password, user.password);

//         if (isPasswordValid) {
//             const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
//             socket.data.user = user;
//             socket.emit('loginSuccess', { message: 'Login successful', token, userId: user._id });
//             io.emit('userConnected', { user });
//         } else {
//             socket.emit('loginFailure', { message: 'Invalid credentials' });
//         }
//     } catch (error) {
//         console.error('Error during login:', error);
//         socket.emit('loginFailure', { message: 'An error occurred during login' });
//     }
// }

