const express = require('express');

const app = express();

app.get('/',(req,res)=>{
    res.send("Hello, User")
})

app.get('/hello',(req,res)=>{
    res.send({success:true,msg:"Hello World"})
})

app.listen(process.env.PORT);