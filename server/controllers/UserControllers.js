const { UserModel } = require('../models/UserModel');

exports.signUp = async function (req, res) {
    const { username, email, password } = req.body

    const isUser = await UserModel.findOne({ email })
    if(isUser) {
        res.send({ msg : "user already exits please login", isUser })
    } else {
        bcrypt.hash(password, 5, async function(err, hash) {
            if(err) {
                res.send({ msg: "something went wrong, plz try again later", err })
            } 
            else {
                const user = new UserModel({  
                    username,  
                    email,  
                    password: hash
                })
                try {          
                    await user.save()
                    res.status(200).send({ msg: "signUp Successful", user })
                } catch (err) {
                    console.log(err)
                    res.send({ msg: "something went wrong, plz try again", err })
                }
            }   
        });
    }   
}


exports.login = async function (req, res) {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
  
    if (!user) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
  
    if (isPasswordValid) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      return res.json({ msg: 'Login successful', token, userId: user._id });
    } else {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }
};



    // debugger  
    // const { email, password } = req.body

    // const user = await UserModel.findOne({email})
    // const hash = user.password
    // bcrypt.compare(password, hash, function(err, result) {
    //     if(err) {
    //         res.status(500).send({ msg: "something went wrong, plz try again later", err })
    //     }
    //     if(result) {
    //         const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET)
    //         res.json({ msg: "Login successful", token, userId: user._id })
    //     } else {
    //         res.status(401).send({ msg: "Invalid credential" })
    //     }
    // });
