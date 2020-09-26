const router = require('express').Router();
const UserModel = require('../models/user');

// Helper
const Hash = require('../helper/hash');
const Token = require('../helper/token')

router.post('/register', (req, res) => {
    let user = req.body.user;
    let pass = Hash.generateHash(user.password)
        .then(hashPassword => {
            user.password = hashPassword;
            let userModel = new UserModel(user);
            userModel.save().then(saved_user => {
                res.send({success:true,message:"Account created successfully",saved_user})
            }).catch(err => {
                res.send({success:false,message:"Account creation failed"})
            })
        })
})

router.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let userDetails = {};
    UserModel.findOne({ username })
        .then(user => {
            userDetails.name = user.name;
            userDetails.username = user.username;
            return Hash.comparePassword(password, user.password)
        }).then(success => {
            if (success) {
                return Token.generateToken(userDetails)
            } else {
                throw ({ success, message: "Invalid credentials" });
            }
        }).then(token => {
            userDetails.token = token;
            res.send({ success:true, user: userDetails, message: "Login successful" });
        }).catch(err => {
            res.send(err);
        })
})

module.exports = router;