const mongoose=require('mongoose');

mongoose.connect('mongodb://user01:user01@ds121295.mlab.com:21295/movies-management',{ useNewUrlParser: true, useUnifiedTopology: true });

module.exports={
  mongoose
}