var express = require('express');
var path = require('path');
var router = express.Router();
var json_file = require(path.join(__dirname,'../demo.json'));
var Person = require(path.join(__dirname,'../models/model.js'));


//#########################basic stucture ##############
// router.get('/', function (req, res) {
//    // res.send('GET route on things.');
//    // res.sendFile(path.join(__dirname,"../templates/index.html"))
//    // res.sendFile(path.join(__dirname,"../views/index"))
//    // console.log(json_file)
//    res.render("index", json_file)
// });

// router.get('/:id', function (req, res) {
//    res.send('GET route on things. id' + req.params.id);
// });

// router.post('/', function (req, res) {
//    res.send('POST route on things.');
// });


//################ RETRIVE DATA ###########################
router.get("/",(req,res)=>{

   //################ find all persons without any velidations ################
   // Person.find((eror,response)=>{
   //    resData = {}
   //    resData["data"]= response
   //    // console.log(resData)
   //    res.render("index", resData)
   // })

   //################ find all persons which have status = true ################
   Person.find({"status":true},(eror,response)=>{
      resData = {}
      resData["data"]= response
      res.render("index", resData)
   })
})

//################ OPEN INSERT MODE ###########################
router.get("/person",(req,res)=>{
   res.render("insert")
})

//################ OPEN UPDATE MODE ###########################
router.get("/person/update/:id",(req,res)=>{
   Person.findById(req.params.id, function(err, response){
      resData = {}
      resData["person"]= response
      // console.log(resData)
      res.render("update", resData)
   });
})

//################ OPEN UPDATE MODE ###########################
router.post("/person/update/:id",(req,res)=>{
   reqData = {}
   reqData["name"]= req.body.name
   reqData["age"]= req.body.age
   
   Person.findByIdAndUpdate(req.params.id, reqData, (err, response)=>{
      res.redirect("/")
   });
})

//################ OPEN UPDATE MODE ###########################
router.get("/person/delete/:id",(req,res)=>{

   // "HARD DELETE"
   // Person.findByIdAndRemove(req.params.id, function(err, response){
   //    // if(err) res.json({message: "Error in deleting record id " + req.params.id});
   //    // else res.json({message: "Person with id " + req.params.id + " removed."});
   //    res.redirect("/")
   // });
   
   // "SOFT DELETE"
   reqData = {}
   reqData["status"] = false
   Person.findByIdAndUpdate(req.params.id, reqData, (err, response)=>{
      res.redirect("/")
   });
})

//################ INSERT DATA ###########################
router.post("/person",(req,res)=>{
   // console.log(req.body)

   var personInfo = req.body; //Get the parsed information
   if(!personInfo.name || !personInfo.age){
      res.send("error")
      // res.render('show_message', {
      //    message: "Sorry, you provided worng info", type: "error"});
   } else {
      var newPerson = new Person({
         name: personInfo.name,
         age: personInfo.age,
      });
		
      newPerson.save((err, Person)=>{
         if(err)
            // res.render('show_message', {message: "Database error", type: "error"});
            res.send("error")
         else
            res.redirect("/")
            // res.render('show_message', {
            //    message: "New person added", type: "success", person: personInfo});
      });
   }
})
//export this router to use in our index.js
module.exports = router;