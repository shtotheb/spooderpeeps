var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create a schema
var dhtSchema = new Schema({
  hash: String
});




// the schema is useless so far
// we need to create a model using it
var DHTs = mongoose.model('DHTs', dhtSchema);

// make this available to our users in our Node applications
module.exports = DHTs;
