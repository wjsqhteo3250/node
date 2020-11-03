const express = require('express')
const fs = require('fs')
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public2'));
app.set('views', './orientdb');
app.set('view engine', 'pug')
app.locals.pretty = true;
var OrientDB = require('orientjs');
const { title } = require('process');

var server = OrientDB({
   host:       'localhost',
   port:       2424,
   username:   'root',
   password:   'wjs3250@@',
   useToken: true
});
var db = server.use('jeon');

app.get('/topic/add',(req,res)=>{
  var sql = 'SELECT FROM topic'
  db.query(sql).then(function(topics){
  res.render('add', {topics:topics});
})
})

app.post('/topic/add',(req,res)=>{
  var sql = 'INSERT INTO topic (title, description, author) VALUES(:title, :desc, :author)';
  const title = req.body.title;
  const desc = req.body.desc;
  const author = req.body.author;
var param = {params:{title:title, desc:desc, author:author}}
db.query(sql,param).then(function(results){
    res.redirect(`/topic/${encodeURIComponent(results[0]['@rid'])}`)
});
})


app.get(['/topic', '/topic/:topic'],(req,res)=>{
  var sql = 'SELECT FROM topic'
  db.query(sql).then(function(topics){
    var id = req.params.topic;
    if(id){
      var sql = 'SELECT FROM topic WHERE @rid=:rid';
      db.query(sql, {params:{rid:id}}).then(function(topic){
        res.render('index',{topics:topics, topic:topic[0]});
      })
    }
    else{
      res.render('index',{topics:topics, title:'welcome', content:'javascript leaning project'})
    }
  })
})

app.get('/topic/:id/edit',(req,res)=>{
  var sql = 'SELECT FROM topic'
  var id = req.params.id;
  db.query(sql).then(function(topics){
    var sql = 'SELECT FROM topic WHERE @rid=:rid';
    db.query(sql, {params:{rid:id}}).then(function(topic){
      res.render('edit',{topics:topics, topic:topic[0]});
    })
})
})

app.post('/topic/:id/edit',(req,res)=>{
  var sql = 'UPDATE topic SET title=:t, description=:d, author=:a WHERE @rid=:rid';
  var id = req.params.id;
  var title = req.body.title;
  var desc = req.body.desc;
  var author = req.body.author;
  db.query(sql, {params:{rid:id, t:title, d:desc, a:author}}).then(function(topic){
    res.redirect(`/topic/${encodeURIComponent(id)}`)
  }) 
})

app.get('/topic/:id/delete',(req,res)=>{
  var sql = 'SELECT FROM topic'
  var id = req.params.id;
  db.query(sql).then(function(topics){
    var sql = 'SELECT FROM topic WHERE @rid=:rid';
    db.query(sql, {params:{rid:id}}).then(function(topic){
      res.render('delete',{topics:topics, topic:topic[0]});
    })
})
})

app.post('/topic/:id/delete',(req,res)=>{
  var sql = 'DELETE FROM topic WHERE @rid=:rid UNSAFE';
  var id = req.params.id
  db.query(sql, {params:{rid:id}}).then(function(results){
    res.redirect('/topic')
});
})

app.listen(3000, ()=>{console.log('listen 3000port')});