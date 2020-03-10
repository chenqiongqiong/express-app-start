const createError = require('http-errors');
const http = require('http');
const express = require('express');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// const bodyParser = require('body-parser');
const router = require('./routes/index.js');

const app = express();
const httpServer = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

httpServer.listen(3000);

// app.use('/bee/portal', express.static(path.join(__dirname, 'static')));
// app.get(/^\/bee\/portal.*/, (req, res) => {
//   res.sendFile(`${__dirname}/static/index.html`);
// });

// app.get('/', (req, res) => {
//   res.end('hello world');
// });


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
