var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var registerRouter = require('./routes/register');
var app = express();


//set up express session
var session = require('express-session');


//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://crisarevalom:krismiranda7@pw2019-lg9ht.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
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
app.use('/login', authRouter);
app.use('/register',registerRouter);

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

//set up sessions in app
app.use(session({
  secret: '7\n\xca\xef\xe2\xa4RNFqOPq\xb7\x8c\xb1\xbb\xfd\xd1kTUI\xf2\x11\xf9C/\x06!\xdb\x06\xfc\x1f',
  resave: false,
  saveUninitialized: true
}))

module.exports = app;
