const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const movies = require('./routes/movies');
const users = require('./routes/users');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send("Hello, User")
})

app.use('/movies',movies);
app.use('/user',users);

app.get('/hello',(req,res)=>{
    res.json({success:true,msg:"Hello World"})
})

const port=process.env.PORT||3000;
app.listen(port,()=>{
    console.log('server started')
});