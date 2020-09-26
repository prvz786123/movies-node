const jwt = require('jsonwebtoken');

const privateKey="secret@123"

function generateToken(data){
        return jwt.sign(data,privateKey,{ expiresIn: '1h' })
}

function verifyToken(token){
    return jwt.verify(token,privateKey)
}


module.exports={
    generateToken,
    verifyToken
}