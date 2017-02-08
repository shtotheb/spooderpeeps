var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var torrentSchema = new Schema({
  infoHash : String,
  name : String,
})
