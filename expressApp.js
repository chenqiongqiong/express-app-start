const createError = require('http-errors');
const express = require('express');
const path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
const mysql = require('mysql');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'qiong',
  password: 'qiong666',
});


connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

app.get('/api/sql', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const sql = `insert into test.test_table_1 (name) values ("${new Date().toString()}")`;
  connection.query(sql, (err, rows, fields) => { // eslint-disable-line
    if (err) throw err;
    res.status(200).json({
      msg: 'success',
    });
    console.log('success!  --rows.affectedRows: ', rows.affectedRows);
  });
});

// app.get(/^bee\/portal.*/, (req, res) => {
app.get('/bee/portal', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});


// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use('/bee/portal', express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'public')));
app.listen(3000, () => {
  console.log('listening on port: 3000');
});


// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;
