// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

const express = require('express')
const fs = require('fs')
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public2'));
app.set('views', './vog');
app.set('view engine', 'pug')
app.locals.pretty = true;

// app.get('/topic/:as',(req, res)=>{
//   const tropi = ['javascirpt','node js','express']
//   const outPut = 
//   `<a href=/topic/0>javascript</a></br>
//   <a href=/topic/1>node js</a></br>
//   <a href=/topic/2>express</a></br></br>
//   ${tropi[req.params.as]+', '+req.params.sex}`
//   res.send(outPut);
// })

// app.get('/form_sub', (req,res)=>{
//   const title = req.query.title;
//   const desc = req.query.desc;
//   res.send(title+', '+desc);
// })

app.get('/form',(req,res)=>{
  fs.readdir('data', 'utf-8', (err, files)=>{
    if(err){
      res.status(500).send('err');
    }
  res.render('postGet', {topics:files});
})
})

app.get(['/topic', '/topic/:topic'],(req,res)=>{
  fs.readdir('data', 'utf-8', (err, files)=>{
    if(err){
      res.status(500).send('err');
    }
    const topic = req.params.topic
    if(topic){
        fs.readFile(`data/${topic}`,(err,content)=>{
          if(err){
            res.status(500).send('err');
          }
            res.render('index',{topics:files, title:topic, content:content});
      })
    }
   else{
     res.render('index', {topics:files, title:'welcome', content:'javascript leaning project'});
   }
  })
})

app.post('/form_sub',(req,res)=>{
  const title = req.body.title;
  const desc = req.body.desc;
  fs.writeFile(`data/${title}`,desc,(err)=>{
    if(err){
      res.status(404).send('err')
    }
    res.redirect(`topic/${title}`)
  })
})

// app.get('/temper',(req, res)=>{
//   res.render('index', {time:Date()});
// })

app.listen(3000, ()=>{console.log('listen 3000port')});