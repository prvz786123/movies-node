const {mongoose} = require('../factory/db_connection');

const MoviesSchema = new mongoose.Schema({
    "popularity":{
        type:Number,
        required:true,
        trim:true
      },
      "director":{
        type:String,
        required:true,
        trim:true
      },
      "genre":{
        type:[String],
        required:true,
        trim:true
      },
      "imdb_score":{
        type:Number,
        required:true,
        trim:true
      },
      "name":{
        type:String,
        required:true,
        trim:true,
        unique:true
      }
})

MoviesSchema.index({name:'text'});


let Movies = mongoose.model('movies',MoviesSchema);

module.exports=Movies;