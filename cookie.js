const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/count',(req, res)=>{
    if(req.cookies.count){
        count = parseInt(req.cookies.count);
    } else{
        count = 0;
    }
    count = count+1;
    res.cookie('count', count);
    res.send('cookie : '+count);
})

app.listen(3003, function(){
    console.log('Listening port 3003')
})