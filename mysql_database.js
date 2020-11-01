var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '111111',
  database : 'o2'
});
 
connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results[0].solution);
//   });
   
//   connection.end();

// const sql = 'select * from topic';
// connection.query(sql,function(err, rows, fields){
//     if(err) {console.log('err')}
//     else {
//         for(var i=0; i<rows.length; i++){
//             console.log(rows[i].author);
//         }
//     }
// })

// const sql = 'INSERT INTO topic (title, description, author) VALUES(?,?,?)';
// const params = ['supervisor','watcher','graphittie'];
// connection.query(sql, params, function(err, rows, fields){
//     if(err){console.log('err')}
//     else{console.log(rows.insertId)}; 
// })

// const sql = 'UPDATE topic SET title=?, description=? WHERE id=?';
// const params = ['nicolas','programmer of nomad code','4'];
// connection.query(sql, params, function(err, rows, fields){
//     if(err){console.log('err')}
//     else{console.log(rows)}; 
// })

const sql = 'DELETE FROM topic WHERE id=?';
const params = [6];
connection.query(sql, params, function(err, rows, fields){
    if(err){console.log('err')}
    else{console.log(rows)}; 
})
connection.end();