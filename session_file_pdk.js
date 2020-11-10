const { urlencoded } = require('express');
const express = require('express');
const session = require('express-session');
const pbkdf2 = require('pbkdf2');
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


var users =[{
    id:'egoing',
    pw:'ae5643c21f093cf5010ad0637d3a2513f07e52d718fe87d1a7069e6a88a40f98',
    displayName:'jeon',
    salt:'salt'
}]

app.post('/auth/login',(req, res)=>{
    const id = req.body.id;
    const pw = req.body.pw;
    for(var i=0; i<users.length; i++){
        var user = users[i];
        if(id===user.id) {
            return pbkdf2.pbkdf2(pw, user.salt, 10000, 32, 'sha512', function(err, derivedKey){
                if(derivedKey.toString('hex') === user.pw.toString('hex')){
                    req.session.displayName = user.displayName;
                    req.session.save(function(){
                        res.redirect('/auth/comp');
                    })
                } else{
                    res.redirect('/auth/wrong');
                }
            })
        }
    }
   
})

app.get('/auth/register', (req, res)=>{
    res.render('register')
});

app.post('/auth/register',(req, res)=>{
    pbkdf2.pbkdf2(req.body.password, 'stw', 10000, 32, 'sha512', (err, derivedKey)=>{
        var user = {
            id : req.body.username,
            pw : derivedKey.toString('hex'),
            displayName : req.body.description,
            salt : 'stw'      
        };
        users.push(user);
        req.session.displayName = req.body.displayName;
        console.log(users);
        req.session.save(()=>{
            res.redirect('/auth/comp')
        })
    })
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
console.log(users);
app.listen('3000', ()=>{console.log('listening port 3000')})