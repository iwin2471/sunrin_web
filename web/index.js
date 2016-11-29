var port = 8080;

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cookie = require('cookie');
var rndomstring = require('randomstring');
var session = require('express-session');
var sessionstore = require('sessionstore');
var store = sessionstore.createSessionStore();
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var db = require('./mongo');
var unirest = require('unirest');
var async = require('async');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use( session( { store: store, secret: '앙기모띠', saveUninitialized: true}));


require('./routes/index')(app);


/**
 * ADDED!! Socket.IO Connection.
 */

app.post('/users', function(req, res){
  req.send('asdf');
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;

http.listen(port, function(){
    console.log('NoWhere Server running on Port ' + port);
});
