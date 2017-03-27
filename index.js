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
	if(typeof metadata.info.name !== 'undefined' && typeof metadata.info.files !== 'undefined'){

    record.size = 0;
		record.files = [];
		metadata.info.files.forEach(function(element){
			try{
				var temp = {};
				temp.length = element.length;
				temp.path = element.path.toString();
				record.files.push(temp);
        record.size = record.size + temp.length;
			}catch(error){
				console.log(error);
			}
		});


    var newRecord = new Records({
      '_id': metadata.infohash,
      'name': metadata.info.name.toString(),
      'search': metadata.info.name.replace(/\.|\_/g, ' '),
      'magnet': metadata.magnet,
      'size': record.size,
      'files': {
        'path': record.files.map(f => f.path),
        'length': record.files.map(f => f.length)
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
