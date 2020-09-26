var bcrypt = require('bcryptjs');


function generateHash(plainPassword){
    return bcrypt.hash(plainPassword, 8)
}

function comparePassword(password,hash){
    return bcrypt.compare(password,hash);
}


module.exports={
    generateHash,
    comparePassword
}
