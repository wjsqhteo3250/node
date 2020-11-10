const { urlencoded } = require('express');
const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.set('views','./vog');
app.set('view engine', 'pug')


const option = {
    host: 'localhost',
    user     : 'root',
    password : '111111',
    database : 'o2'
}
const sessionStore = new MySQLStore(option);
app.use(session({
    store: sessionStore,
    secret: 'funckin shit',
    resave: false,
    saveUninitialized: true
}))

app.get('/count', (req, res)=>{
    if(req.session.count){
        req.session.count++
    } else {
        req.session.count = 1
    }
    res.send('result : '+ req.session.count);
})

app.get('/auth/login', (req, res)=>{
    res.render('session')
})

app.post('/auth/login',(req, res)=>{
    const id = req.body.id;
    const pw = req.body.pw;
    const user = {
        id:'egoing',
        pw:'1111',
        displayName:'jeon'
    }
    if(id===user.id && pw===user.pw) {
        req.session.displayName = user.displayName;
        res.redirect('/auth/comp')
    } else {
        res.redirect('/auth/wrong')
    }
})

app.get('/auth/logout',(req, res)=>{
    delete req.session.displayName;
    req.session.save(()=>{
        res.redirect('/auth/comp');
    })
   
})

app.get('/auth/comp',(req, res)=>{
    if(req.session.displayName){
        res.send(`hello, ${req.session.displayName} <a href="/auth/logout">logout</a>`);
    } else {
        res.send('<h1>welcome</h1><a href="/auth/login">login</a>');
    }
})
app.get('/auth/wrong',(req, res)=>{
    res.send('wrong <a href="/auth/login">login</a>')
})
app.listen('3000', ()=>{console.log('listening port 3000')})