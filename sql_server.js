const express = require('express')
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public2'));
app.set('views', './mysql');
app.set('view engine', 'pug')
app.locals.pretty = true;

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '111111',
  database : 'o2'
});
 
connection.connect();

app.get('/topic/:id/delete', (req, res)=>{
  const sql = 'SELECT * FROM topic'
  connection.query(sql, function(err, topics){
    if(err){
      res.status(500).send('delete all err')
    } else {
      const id = req.params.id;
      const sql = `SELECT * FROM topic WHERE id=${id}`
      connection.query(sql, function(err, topic){
        if(err){
          res.status(500).send('delete get err');
        } else {
          if(topic.length===0){
            res.status(500).send('there is nothing')
          }else{
            res.render('delete', {topics:topics, topic:topic[0]})
          }
        }
      })
    }
  })
})

app.post('/topic/:id/delete', (req, res)=>{
  const sql = 'DELETE FROM topic WHERE id=?'
  const params = [req.params.id];
  connection.query(sql, params, function(err, result){
    if(err){
      res.status(500).send('delete post err')
    } else {
      res.redirect('/topic');
    }
  })
})

app.get('/topic/:id/edit', (req, res)=>{
  const sql = 'SELECT * FROM topic'
  connection.query(sql, function(err, topics){
    if(err){
      res.status(500).send('edit all err')
    } else {
      const id = req.params.id;
      const sql = `SELECT * FROM topic WHERE id=${id}`
      connection.query(sql, function(err, topic){
        if(err){
          res.status(500).send('edit get err');
        } else {
          if(topic.length===0){
            res.status(500).send('there is nothing')
          }else{
            res.render('edit', {topics:topics, topic:topic[0]})
          }
        }
      })
    }
  })
})

app.post('/topic/:id/edit',(req, res)=>{
  const sql = 'UPDATE topic SET title=?, description=?, author=? WHERE id=?'
  const title = req.body.title;
  const description = req.body.desc;
  const author = req.body.author;
  const id = req.params.id;
  const params = [title, description, author, id];
  connection.query(sql, params, function(err, result){
    if(err){
      res.status(500).send('edit post err')
    } else {
      res.redirect(`/topic/${id}`)
    }
  })
})

app.get('/topic/add',(req,res)=>{
  const sql = 'SELECT * FROM topic'
  connection.query(sql, function(err, topics){
    if(err){
      res.status(500).send('add err');
    } else {
      res.render('add',{topics:topics})
    }
  })
})

app.post('/topic/add',(req,res)=>{
  const title = req.body.title;
  const description = req.body.desc;
  const author = req.body.author;
  const sql = 'INSERT INTO topic (title, description, author) VALUES(?, ?, ?)';
  const params= [title, description, author];
  console.log(params);
  connection.query(sql,  params, function(err, result, fields){
      if(err){
        res.status(500).send('add post err');
      }
      res.redirect(`/topic/${result.insertId}`);
  })
})

app.get(['/topic', '/topic/:topic'],(req,res)=>{
  const sql = 'SELECT * FROM topic'
  connection.query(sql, function(err, topics, fields){
    if(err){
      res.status(500).send('err');
    } else{
      const id = req.params.topic;
      if(id){
        const sql = `SELECT * FROM topic WHERE id=${id}`
        connection.query(sql, function(err, topic){
          if(err){
            res.status(500).send('id err');
          } else{
           res.render('index',{topics:topics, topic:topic[0]})
          }
        })
      }else{
        res.render('index',{topics:topics})
      }
    }
  })
})





app.listen(3000, ()=>{console.log('listen 3000port')});