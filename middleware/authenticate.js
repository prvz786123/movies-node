const User = require('../models/user');
const Token = require('../helper/token');
const {mongoose} = require('../factory/db_connection');

function authenticateToken(req,res,next){
    let token = req.header('x-auth')
    try{
        const verifiedUser=Token.verifyToken(token)
        User.findOne({username:verifiedUser.username}).then(user=>{
            if(user){
                next();
            }else{
                res.status(401).send({success:false,message:'Access denied'})
            }
        }).catch(err=>{
            res.status(401).send({success:false,message:'Access denied'})
        })
    }catch(err){
        res.status(401).send({success:false,message:'Access denied'})
    }
}

module.exports={
    authenticateToken
}