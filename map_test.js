var kvArray = {
 hashish : [
   {key: 1, value: 10},
   {key: 2, value: 20},
   {key: 3, value: 30}
 ]
}

  var reformattedArray = kvArray.hashish.map(function(obj) {
    var rObj = {};
    rObj[obj.key] = obj.value;
    return rObj;
  });

  var reformattedArray2 = kvArray.hashish.map(obj => {
    var rObj = {};
    rObj[obj.key] = obj.value;
    return rObj;
  });

  var reformattedArray3 = kvArray.hashish.map(obj => obj.value);
  var record = 0
  var totalArray = kvArray.hashish.forEach(function(element){
    record = record + element.value;
  });

console.log(reformattedArray)
console.log(reformattedArray2)
console.log(reformattedArray3)
console.log(record)


// 'use strict';
//
// const mongoose = require('mongoose').set('debug', true);
// const Records = require('./schemes/Records.js');
//
// mongoose.connect('mongodb://siamang2000:siamang2000@ds143000.mlab.com:43000/siamang_test');
//
// // var db = mongoose.connection;
// // db.on('error', console.error.bind(console, 'connection error:'));
// // db.once('open', function() {
// //   console.log("Connected to mlab")
// // });
//
// // Records.find({})
//
// Records.findById("c69818a17e8d63c1116a295e15180edd13dsalim83c6d", function(err, doc){
//   if (err) console.log("error");
//   if (doc == null) console.log("Null bitch!");
// })
