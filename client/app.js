/* eslint-disable */
var express = require('express');
var app = express();
const expressRouter = express.Router();
var mysql = require('mysql');


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456'
});

connection.connect();

expressRouter.get('/sql', function(req, res) {
  // res.header("Access-Control-Allow-Origin", "*");
  const sql = 'insert into test.test_table_2 (name) values ("'+ new Date().toString() + '")';
  connection.query(sql, function(err, rows, fields) {
    if (err) throw err;
    res.json({
      msg: 'success'
    })
    console.log('success!  --rows.affectedRows: ', rows.affectedRows);
  });
})

app.use('/api', expressRouter);

// connection.end();
