const { urlencoded } = require('express');
const express = require('express');
const session = require('express-session');
const md5=require('md5');
const FileStore = require('session-file-store')(session);
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.set('views','./vog');
app.set('view engine', 'pug')
app.use(session({
    store: new FileStore(),
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

const salt = '142##@@';

app.post('/auth/login',(req, res)=>{
    const id = req.body.id;
    const pw = req.body.pw;
    const user = {
        id:'egoing',
        pw:'6dd089b992bb2ae3ddf070df28b9a183',
        displayName:'jeon'
    }
    if(id===user.id && md5(pw+salt)===user.pw) {
        req.session.displayName = user.displayName;
        res.redirect('/auth/comp')
    } else {
        res.redirect('/auth/wrong')
    }
})

app.get('/auth/logout',(req, res)=>{
    delete req.session.displayName;
    res.redirect('/auth/comp');
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