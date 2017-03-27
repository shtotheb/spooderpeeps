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
  var exists = false;
  Records.findById(metadata.infohash).exec(exists = true);
  console.log("Metadata found!!  ", metadata.info.name.toString(), " exists = ", exists);
	if(typeof metadata.info.name !== 'undefined' && typeof metadata.info.files !== 'undefined' && exists == false){
		record.name = metadata.info.name.toString();
		record.search = record.name.replace(/\.|\_/g, ' ');
		record.infohash = metadata.infohash;
		record.magnet = metadata.magnet;
		record.dht = 1;
    record.size = 0;

		if(typeof metadata.info['file-duration'] !== 'undefined' && metadata.info['file-duration'].length < 100){
			record.file_duration = metadata.info['file-duration'];
		}

		if(typeof metadata.info['file-media'] !== 'undefined' && metadata.info['file-media'].length < 100){
			record.file_media = metadata.info['file-media'];
		}

		var files = metadata.info.files;
		if(typeof files !== 'undefined' && files.length < 100){
			record.files = [];
			files.forEach(function(element){
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
		}

		record.type = '';
		record.categories = [];
		record.peers_updated = 0;

    var newRecord = new Records({
      '_id': record.infohash,
      'name': metadata.info.name.toString(),
      'search': record.search,
      'magnet': record.magnet,
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
