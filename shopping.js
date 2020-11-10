const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const product = {
    1:{title:'product 1'},
    2:{title:'product 2'}
};


app.get('/shopping', (req, res)=>{
    var outPut = '';
    for(var name in product){
        outPut += `<li><a href="/cart/${name}">${product[name].title}</a></li>`
    }
    res.send(`<h1>products</h1><ul>${outPut}</ul><a href="/cart">cart</a>`);
})

app.get('/cart/:id',(req,res)=>{
    var id = req.params.id;
    if(req.cookies.cart){
        var cart = req.cookies.cart;
    } else {
        var cart = {};
    }
    if(!cart[id]){
        cart[id]=0;
    }
    cart[id] = parseInt(cart[id])+1;
    res.cookie('cart',cart);
    res.redirect('/cart');
})

app.get('/cart', (req, res)=>{
    var cart = req.cookies.cart;
    if(!cart) {
        res.send('empty!');
    } else{
        var outPut = '';
        for(var id in cart){
            outPut += `<li>${product[id].title} (${cart[id]}) <button onclick='event.target.parentNode.style.diplay
            ="none", res.cookie('cart[id]', undefined)>delete</button></li>`
        }
    }
    res.send(`<ul>${outPut}</ul><a href="/shopping">products list</a>`)
})


app.listen('3000',()=>{console.log('listening 3000port')});
