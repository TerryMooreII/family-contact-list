var Mongoose   = require('mongoose');

var personSchema = Mongoose.Schema({
  family:String,
  gen1:String,
  gen2:String,
  firstName:String,
  maidenName:String,
  familyName:String,
  birtDate:Date,
  weddingDate:Date,
  phone:Array,
  street:String,
  city:String,
  zip:String,
  email:Array,
  social:Array
});

var person = Mongoose.model('Person', personSchema);

module.exports = {
  Person: person
};