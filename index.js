'use strict';

const mongoose = require('mongoose');
const Records = require('./schemes/Records.js');

mongoose.connect('mongodb://siamang1945:siamang1945@ds143000.mlab.com:43000/siamang_test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to mlab")
});

var count = 0;

var P2PSpider = require('./lib');

var p2p = P2PSpider({
    nodesMaxSize: 200,   // be careful
    maxConnections: 400, // be careful
    timeout: 5000
});

p2p.ignore(function (infohash, rinfo, callback) {
    // false => always to download the metadata even though the metadata is exists.
    var theInfohashIsExistsInDatabase = false;
    callback(theInfohashIsExistsInDatabase);
});

p2p.on('metadata', function (metadata) {
	var record = {};
  var exists = true;

  Records.findById(metadata.infohash, function(err, doc){
    if (err) console.log(err);
    console.log("doc =  ", doc);
    if (doc ==  null) exists=false;
  })

  console.log("Metadata found!!  ", metadata.info.name.toString(), " exists = ", exists);

	if(typeof metadata.info.name !== 'undefined' && typeof metadata.info.files !== 'undefined' && exists == false){

    record.size = 0;

		var files = metadata.info.files;
		if(typeof files !== 'undefined' && files.length < 100){
			record.files = [];
			files.forEach(function(element){
          record.size = record.size + element.length;
			});
		}

    var newRecord = new Records({
      '_id': metadata.infohash,
      'name': metadata.info.name.toString(),
      'search': metadata.info.name.replace(/\.|\_/g, ' '),
      'magnet': metadata.magnet,
      'size': record.size,
      'files': {
        'path': metadata.info.files.map(f => f.path),
        'length': metadata.info.files.map(f => f.length)
      },
      'imported': new Date(),
      'updated': new Date()
    });

    newRecord.save(function (err, newRecord) {
      if (err) return console.error(err);
      console.log(newRecord.name, " metadata saved!")
    });

	}

});

p2p.listen(6881, '0.0.0.0');
