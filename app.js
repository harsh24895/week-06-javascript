var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session'); //this is for session only
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var User = require('./models/user');
mongoose.connect('mongodb+srv://admin:test@cluster0-9iex3.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true})




var db = mongoose.connection;
db.on('error', () => console.log("There is an error in connection"));
db.once('open', () => console.log("we have connected to mongoose"));


var indexRouter = require('./routes/index');
var articlesRouter = require('./routes/articles');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//after static folder, it will initial in our session
//also it needs before our router
app.use(session({ 
secret: 'unicorn', 
resave: false, 
saveUninitialized: true 
}));

// Init passport for auth. and this must be done after using the session
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.post('/login',
  passport.authenticate('local', { 
    failureRedirect: '/login', 
    successRedirect: '/' })
 
  );


app.get('/login',(req, res)=>res.send('This is messsgae'));

app.use((req, res, next)=> {
  // if (!req.session.test) req.session.test = 1;
  // else req.session.test += 1;
  // req.session.test = 1;
  console.log(`REQ.USER: ${req.user}`);
  next();
});

app.use('/', indexRouter);
app.use('/articles', articlesRouter);

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

module.exports = app;
