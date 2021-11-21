// ##################### MONGOOSE START ###########
var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// connect mongoose database use promisis for that
mongoose.connect('mongodb://localhost:27017/my_first_db',{  useNewUrlParser: true,  useUnifiedTopology: true})
.then(()=>{console.log("connection success!!!")})
.catch((err)=>{console.log("err!!!",err)})

var personSchema = mongoose.Schema({
    id:ObjectId,
    name: String,
    age: Number,
    status :{ type: Boolean, default: true },
 });
var Person = mongoose.model("person", personSchema);

module.exports = Person;
// ##################### MONGOOSE END ###########


// const Comment = new Schema({
//     name: { type: String, default: 'hahaha' },
//     age: { type: Number, min: 18, index: true },
//     bio: { type: String, match: /[a-z]/ },
//     date: { type: Date, default: Date.now },
//     buff: Buffer
//   });