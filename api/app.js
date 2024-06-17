var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var filesRouter = require('./routes/files')


var app = express();
var mongoose = require("mongoose");

var mongoDB = "mongodb://127.0.0.1/ucs";

mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "Error connecting to mongoDB"));
db.once("open", () => {
  console.log("Conection to mongoDB successfull");
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.listen(16001);


app.use('/', indexRouter);
app.use('/files', filesRouter);

module.exports = app;
