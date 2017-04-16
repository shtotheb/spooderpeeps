var Client = require('bittorrent-tracker');
const mongoose = require('mongoose');
const Records = require('./schemes/Records.js');

mongoose.connect('mongodb://siamang1945:siamang1945@ds143000.mlab.com:43000/siamang_test');

var search = function(){
  Records.find({}, {}, {sort : {updated : 1}}, function(err, torrents) {
    if (err) console.log("MONGODB FIND ERROR ", err);
    return(torrents);
  }).limit(75)
  .then( function (torrents) {
    hashes = torrents.map(f => f._id);
    scrape(hashes);
  }, function (err) {
      console.log(err);
    }
  );
}

var scrape = function(hashes){
    var requiredOpts = {
        infoHash: hashes,
        announce: ['udp://tracker.coppersurfer.tk:6969/announce']
    };
    Client.scrape(requiredOpts, function(error, results){
        if(error){
            console.log("======================  SCRAPE ERROR  ======================");
            console.log(error)
            console.log("======================  SCRAPE ERROR  ======================");
            search();
        }else{
            update(results);
        }
    });
}

var update = function(results){
  for (var key in results){
    Records.findByIdAndUpdate(
      key, {
        'swarm': {
          'seeders': results[key].complete,
          'leechers': results[key].incomplete
        },
        'updated': new Date()

      },
      {upsert: true, setDefaultsOnInsert: true, new: true, runValidators: true },
      function (err, doc) {
          if (err) {console.log("MONGODB UPSERT ERROR ", err)}
          else {
            console.log( doc.name, " SEEDERS = ", doc.swarm.seeders, "LEECHERS = ", doc.swarm.leechers);
          }
      }
    )
  }
  search();
}

search();
