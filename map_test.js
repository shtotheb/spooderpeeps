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


'use strict';

const mongoose = require('mongoose').set('debug', true);
const Records = require('./schemes/Records.js');

mongoose.connect('mongodb://siamang2000:siamang2000@ds143000.mlab.com:43000/siamang_test');

var savedCallback = function(name) {
  console.log(name);
}

Records.findById("c69818a17e8d63c1116a295e15180edd13d83c6d", function(err, doc){
  if (err) {
    reject(err)
  }
    console.log(doc)
})

Records.findByIdAndUpdate(
    "c69818a17e8d63c1116a295e15180edd13d83c6dPISS", // find a document with that filter
    {name: 'Milas'}, // document to insert when nothing was found
    {upsert: true, setDefaultsOnInsert: true, new: true, runValidators: true }, // options
    function (err, doc) { // callback
        if (err) {
            console.log(err)
        } else {
            console.log(doc)
        }
    }
);
