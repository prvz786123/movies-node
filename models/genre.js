const {mongoose} = require('../factory/db_connection');

var genreSchema = new mongoose.Schema({
    genre: {
        type: String,
        required:true,
        trim:true,
        unique:true
    }
})

let Genre = mongoose.model('genre',genreSchema);

module.exports=Genre;