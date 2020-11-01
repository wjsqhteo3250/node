var OrientDB = require('orientjs');

var server = OrientDB({
   host:       'localhost',
   port:       2424,
   username:   'root',
   password:   'wjs3250@@',
   useToken: true
});



var db = server.use('jeon');
// var rec = db.record.get('#24:0')
//    .then(
//       function(record){
//          console.log('Loaded Record:', record);
//        }
//    );


// var sql = 'SELECT FROM topic'
// db.query(sql).then(function(results){
//     console.log(results);
// })

// var sql = 'SELECT FROM topic WHERE @rid=:rid'
// var param = {params:{rid:'#24:0'}}
// db.query(sql,param).then(function(results){
//     console.log(results);
// })

// var sql = 'INSERT INTO topic (title, description) VALUES(:title, :desc)';
// var param = {params:{title:'express', desc:'express is...'}}
// db.query(sql,param).then(function(results){
//     console.log(results);
// });

// var sql = "UPDATE topic SET title=:title WHERE @rid=:rid";
// db.query(sql, {params:{title:'Expressjs', rid:'#22:1'}}).then(function(results){
//     console.log(results);
// });

var sql = 'DELETE FROM topic WHERE @rid=:rid UNSAFE';
db.query(sql, {params:{rid:'#22:1'}}).then(function(results){
    console.log(results);
});
