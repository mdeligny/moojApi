var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var upload = require('./routes/upload');
var deals = require('./routes/deals');
var users = require('./routes/users');
var signup = require('./routes/signup');
var authenticate = require('./routes/authenticate');
var memberinfo = require('./routes/memberinfo');
var merchants = require('./routes/merchants');
var init = require('./routes/init');
var services = require('./routes/services');
var busboy = require('connect-busboy');
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('jwt-simple');
var config = require('./config/database');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET");
  res.header("Access-Control-Allow-Headers", "Origin, Accept, Content-Type, Authorization");
  next();
});

mongoose.connect(config.database);

// pass passport for configuration
require('./config/passport')(passport);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(busboy());
app.use('/images', express.static(__dirname + '/public/uploads'));
app.use(express.static(__dirname + '/public'));

app.use('/', routes);
app.use('/signup', signup);
app.use('/authenticate', authenticate);
app.use('/memberinfo', memberinfo);
app.use('/upload', upload);
app.use('/deals', deals);
app.use('/users', users);
app.use('/merchants', merchants);
app.use('/init', init);
app.use('/services', services);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
