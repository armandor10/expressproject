var cors = require('cors');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require('mysql');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');

var app = express();
app.use(cors({
  origin: '*'
}));

require('dotenv').config()

require('./models/client');//initialize mongoose schemas
require('./models/product');
require('./models/order');
require('./models/orderProduct');
var mongoose = require('mongoose');//add for Mongo support
mongoose.connect("mongodb://localhost:27017/" + process.env.DB_NAME,{useNewUrlParser: true});// connect to mongo 
mongoose.Promise = global.Promise;// Get Mongoose to use the global promise library
var db = mongoose.connection;//Get the default connection
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

console.log('RESTful API server started on: ' + 3000);

module.exports = app;
