const router = require('express').Router();
const MoviesModel = require('../models/movies');
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

// Movies Listing
router.get('/',(req,res)=>{
    let startLimit=Number(req.query.startLimit)||0;
    let endLimit=Number(req.query.endLimit)||50;
    MoviesModel.find().skip(startLimit).limit(endLimit).then(movies=>{
        res.send({success:true,movies});
    }).catch(err=>{
        res.send({success:false,error:err});
    })
});

// Search Movie by name
router.get('/search',(req,res)=>{
  let serachValue=req.query.movieName;
  console.log(serachValue)
  MoviesModel.find({"name" : {$regex : `.*${serachValue}.*`}}).exec().then(movies=>{
      res.send({success:true,count:movies.length,movies:movies});
  }).catch(err=>{
      res.send({success:false,error:err});
  })
});

// Update Movie
router.patch('/update',authenticateToken,(req,res)=>{
  let id=req.body.id;
  let updatedMovie=req.body.movie;
  delete updatedMovie.name;
  MoviesModel.findByIdAndUpdate(id,updatedMovie).then(movie=>{
    res.send({success:true, message:"Movie updated successfully"})
  }).catch(err=>{
    res.send({success:false,message:err.message})
  })
})

// Delete Movie by id
router.delete('/delete',authenticateToken,(req,res)=>{
  const id=req.body.id;
  console.log(id);
  MoviesModel.findByIdAndDelete(id).then(deletedMovie=>{
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
//             res.send({success:true,"data":savedMovie})
//         }).catch(err=>{
//             console.log('Error');
//         })
//     })
//     res.send({success:true,counter})
// })


module.exports=router;

// const movie=[]