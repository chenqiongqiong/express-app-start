const fs = require('fs');
const createError = require('http-errors');
const http = require('http');
const https = require('https');
const express = require('express');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./routes/index.js');


const privateKey = fs.readFileSync('./config/ssl/server.key', 'utf8');
const certificate = fs.readFileSync('./config/ssl/server.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const app = express();

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);


// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-
// app.use(bodyParser.urlencoded({ extended: true, type: 'application/x-www-form-urlencoded' }));
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api', router);

// app.use(logger('dev'));
app.use(express.json());
// app.use(cookieParser());
// app.listen(5000, () => {
//   console.log('listening on port: 5000');
// });


httpServer.listen(80);
httpsServer.listen(443);


app.use('/bee/portal', express.static(path.join(__dirname, 'static')));

app.get(/^\/bee\/portal.*/, (req, res) => {
  res.sendFile(`${__dirname}/static/index.html`);
});


// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  console.log(req);
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
