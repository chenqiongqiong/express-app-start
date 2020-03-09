const fs = require('fs');
const createError = require('http-errors');
const http = require('http');
const https = require('https');
const express = require('express');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
const bodyParser = require('body-parser');
// const path = require('path');
const router = require('./routes/index.js');

const privateKey = fs.readFileSync('./config/ssl/server.key', 'utf8');
const certificate = fs.readFileSync('./config/ssl/server.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const app = express();
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', router);
app.use(express.json());

httpServer.listen(3000);
httpsServer.listen(443);

// app.use('/bee/portal', express.static(path.join(__dirname, 'static')));
// app.get(/^\/bee\/portal.*/, (req, res) => {
//   res.sendFile(`${__dirname}/static/index.html`);
// });

// app.get('/', (req, res) => {
//   res.end('hello world');
// });


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
