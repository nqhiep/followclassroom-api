require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const classesRouter = require('./components/classes');
const userClassRouter = require('./components/userclass');
const authRouter = require('./components/auth');
const emailRouter = require('./components/email');
const classlinkRouter = require('./components/classlinkcode');
const gradeRouter = require('./components/grades');
const scoreRouter = require('./components/scores');
const reviewRouter = require('./components/reviews');
const commentRouter = require('./components/comments');
const notificationRouter = require('./components/notifications');
const gradeBoardRouter = require('./components/grade_board');
const authenticate = require('./middlewares/authentication');
const app = express();
const connectDb = require('./config/connectDb');
connectDb();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

var whitelist = [
  'http://localhost:3001',
  'https://follmeclassroom.herokuapp.com',
  'https://follclassroom.herokuapp.com',
  'https://followclassroom-fe.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use(authenticate);
app.use('/classes', classesRouter);
app.use('/userclass', userClassRouter);
app.use('/api', authRouter);
app.use('/classlink', classlinkRouter);
app.use('/email', emailRouter);
app.use('/grades', gradeRouter);
app.use('/scores', scoreRouter);
app.use('/gradeboard', gradeBoardRouter);
app.use('/review', reviewRouter);
app.use('/comment', commentRouter);
app.use('/noti', notificationRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);

  // render the error page
  res.status(err.status || 400);
  res.json({
    isSuccess: false,
    message: (err.status == 500 ? 'Server Error' : err.message) ?? 'Bad request'
  });
});

module.exports = app;
