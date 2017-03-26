var mongoose = require('mongoose');

var RecordSchema = mongoose.Schema({
  _id: { type: String, index: true },
  name: { type: String, index: true },
  search: { type: String, index: true },
  magnet: { type: String, index: true },
  category: { type: String, default: "Unknown", index: true },
  size: { type: Number, default: 0 },
  files: {
    leechers: { type: Number, default: 0 }
    leechers: { type: Number, default: 0 }
  },
  swarm: {
    path: { type: String },
    length: { type: Number, default: 0 }
  },
  imported: {type: Date, default: Date.now, index: true},
  updated: {type: Date, default: Date.now, index: true}
});
var Record = mongoose.model('Record',RecordSchema);

module.exports = Record;
