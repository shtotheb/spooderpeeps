var Client = require('bittorrent-tracker');
const mongoose = require('mongoose');
const Records = require('./schemes/Records.js');
mongoose.connect('mongodb://siamang1945:siamang1945@ds143000.mlab.com:43000/siamang_test');

var search = function(){
  Records.find({}, {}, {sort : {updated : 1}}, function(err, torrents) {
    if (err) console.log(err);
    return(torrents);
  }).limit(50)
  .then( function (torrents) {
    hashes = torrents.map(f => f._id);
    console.log('got hashes for torrents = ', hashes);
    scrape(hashes);
  }, function (err) {
      console.log(err);
    }
  );
}

search();
