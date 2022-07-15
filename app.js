var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb+srv://root:idontknow@webproject.95xptc1.mongodb.net/?retryWrites=true&w=majority', {   promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

var book = require('./routes/book');
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'build', 'public','index.html')));

app.use('/api/book', book);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.send('error');
// });

app.use(express.static("build"));
app.get("*", (req,res)=>{
  console.log("here");
  res.sendFile( path.resolve(__dirname  , "build", "index.html"));
})
app.listen(5005,()=>console.log("Backend running on 5000"));

module.exports = app;
