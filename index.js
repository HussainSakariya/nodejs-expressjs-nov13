// ################ https://www.tutorialspoint.com/expressjs/

// var express = require('express');
// var app = express();

// app.get('/', function(req, res){
//    res.send("Hello world!");
// });

// app.listen(3000);


var express = require('express');
var app = express();
var ejs = require('ejs');
var path = require('path');

// ##################### BODY PARSER START ###########
// for post data
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application
app.use(bodyParser.urlencoded({ extended: true })); 

// for parsing multipart/form-data
app.use(upload.array());
// ##################### BODY PARSER END ###########


// // ##################### MONGOOSE START ###########
// var mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

// // connect mongoose database use promisis for that
// mongoose.connect('mongodb://localhost:27017/my_first_db',{  useNewUrlParser: true,  useUnifiedTopology: true})
// .then(()=>{console.log("connection success!!!")})
// .catch((err)=>{console.log("err!!!",err)})

// var personSchema = mongoose.Schema({
//     id:ObjectId,
//     name: String,
//     age: Number,
//  });
// var Person = mongoose.model("person", personSchema);

// // ##################### MONGOOSE END ###########

// for using static files  (middleware)
// app.use(express.static('public'));
app.use("/static",express.static('public'));

//folder define
var router = require('./routers/router.js');

//route define
app.use('/', router);



app.set('view engine', 'ejs');
app.set('views','./views');

app.listen(3000);