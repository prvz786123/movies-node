const router = require('express').Router();
const MoviesModel = require('../models/movies');
const GenreModel = require('../models/genre');
const {authenticateToken} = require('../middleware/authenticate');

// Add New Movie
router.post('/add',authenticateToken,(req,res)=>{
  let newMovie=req.body.movie;
  let movieModel=new MoviesModel(newMovie);
  movieModel.save().then(savedMovie=>{
    res.send({success:true,message:"Movie added successfully"})
    console.log("add movie => success")
  }).catch(err=>{
    res.send({success:false,message:err.message})
    console.log('Error');
  })
})

router.post('/add/genre',(req,res)=>{
  let newGenre=req.body;
  console.log(newGenre)
    let genreModel=new GenreModel(newGenre);
    genreModel.save().then(savedGenre=>{
      console.log(savedGenre)
      res.send({success:true,message:"Genre added successfully"})
    }).catch(err=>{
      res.send({success:false,message:err.message})
    })
})

// Filter Movies
// Method : Get
// Endpoint : /movies/genre

router.get('/genre',(req,res)=>{
  GenreModel.find().then(genres=>{
    let genreList=[];
    if(genres.length>0){
      genres.forEach(ele=>{
        genreList.push(ele.genre)
      })
    }
    res.send({success:true,genres:genreList})
  }).catch(err=>{
    res.send({success:false,message:err.message})
  })
})

// Movies Listing
// Method : GET
// Endpoint : /movies
// Query Params : startLimit=0&endLimit=50

router.get('/',(req,res)=>{
    let startLimit=Number(req.query.startLimit)||0;
    let endLimit=Number(req.query.endLimit)||30;
    MoviesModel.find().skip(startLimit).limit(endLimit).then(movies=>{
        res.send({success:true,movies});
    }).catch(err=>{
        res.send({success:false,error:err});
    })
});

// Search Movie by name
// Method : GET
// Endpoint : /movies/search
// Query Params : movieName=Star%20Wars

router.get('/search',(req,res)=>{
  let searchValue=req.query.movieName;
  console.log(searchValue)
  var regex = new RegExp(["^",".*", searchValue,".*", "$"].join(""), "i");
  MoviesModel.find({$or:[
    {"name" : { $all: regex }},
    {"director" : { $all: regex }}
]}).then(movies=>{
      res.send({success:true,count:movies.length,movies:movies});
  }).catch(err=>{
      res.send({success:false,error:err});
  })
});

// Search movies by genre
// Method : Post
// Endpoint : /movies/search/genre
// Req Body {
//   "genre":"Action"     
// }

router.post('/search/genre',(req,res)=>{
  let searchValue=req.body.genre;
  console.log(searchValue)
  var regex = new RegExp(["^", searchValue, "$"].join(""), "i");
  console.log(regex)
  MoviesModel.find( { 'genre': { $all: regex } } ).then(movies=>{
      res.send({success:true,count:movies.length,movies:movies});
  }).catch(err=>{
      res.send({success:false,error:err});
  })
});


// Filter Movies
// Method : Get
// Endpoint : /movies/sort
// QueryParams : sortBy=popularity, startLimit=0, endLimit=10;

router.get('/sort',(req,res)=>{
  let sortBy = req.query.sortBy;
  let sortOrder=sortBy==='popularity'?-1:1;
  let startLimit=Number(req.query.startLimit)||0;
  let endLimit=Number(req.query.endLimit)||50;
  sortQuery = {}
  sortQuery[sortBy]=sortOrder;
  MoviesModel.find({}).sort(sortQuery).skip(startLimit).limit(endLimit).exec().then(movies=>{
    res.send({success:true,movies})
  }).catch(err=>{
    res.send({success:false,message:err.message})
  })
})

// Update Movie
router.patch('/update',authenticateToken,(req,res)=>{
  let id=req.body.id;
  let updatedMovie=req.body.movie;
  delete updatedMovie.name;
  MoviesModel.findByIdAndUpdate(id,updatedMovie).then(movie=>{
    if(movie){
      res.send({success:true, message:"Movie updated successfully"})
    }else{
      throw ({message:"Unable to update movie"})
    }
  }).catch(err=>{
    res.send({success:false,message:err.message})
  })
})

// Delete Movie by id
// Method : delete
// Endpoint : /movies/delete?id=movieid

router.delete('/delete',authenticateToken,(req,res)=>{
  const deleteId=req.query.id;
  console.log("delete ",deleteId);
  MoviesModel.findByIdAndDelete(deleteId).then(deletedMovie=>{
    let message=deletedMovie?"Movie deleted successfully":"Movie does not exist";
    res.send({success:true,message,deletedMovie})
  }).catch(err=>{
    res.send({success:false,error:err.message});
  })
});

// router.post('/bulk',(req,res)=>{
//     console.log('bulk insertion started');
//     counter=0;
//     movie.forEach(ele=>{
//         counter++;
//         console.log(counter);
//         let newMovie=ele;
//         let movieModel=new MoviesModel(newMovie);
//         movieModel.save().then(savedMovie=>{
//             console.log('success: ',counter)
//         }).catch(err=>{
//             console.log('Error',err);
//         })
//     })
//     res.send({success:true,counter})
// })


module.exports=router;

// const movie=[]

