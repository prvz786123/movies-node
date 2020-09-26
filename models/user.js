const {mongoose} = require('../factory/db_connection');

const UserSchema = new mongoose.Schema({
    "name":{
        type:String,
        required:true,
        trim:true
    },
    "username":{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    "password":{
        type:String,
        required:true,
        trim:true
    }
})

let User = mongoose.model('user',UserSchema);

module.exports=User;