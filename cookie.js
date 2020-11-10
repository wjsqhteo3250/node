const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser('2345####$$'));

app.get('/count',(req, res)=>{
    if(req.signedCookies.count){
        count = parseInt(req.signedCookies.count)+1;
    } else{
        count = 0;
    }
    res.cookie('count', count, {signed:true});
    res.send('cookie : '+count);
   
 
    
})

app.listen(3003, function(){
    console.log('Listening port 3003')
})