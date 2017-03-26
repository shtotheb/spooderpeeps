'use strict';

const mongoose = require('mongoose');
const Torrent = require('./schemes/Torrent.js');

mongoose.connect('mongodb://digital_ocean:digital123@ds145158.mlab.com:45158/metadata_test');

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
	if(typeof metadata.info.name !== 'undefined'){
		record.name = metadata.info.name.toString();
		record.search = record.name.replace(/\./g, ' ');
		record.search = record.search.replace(/\_/g, ' ');
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
		record.tags = [];
		record.peers_updated = 0;

		console.log(`Added: ${record.infohash} | ${record.name}`);
    console.log(`Files:`);
    console.log(record.files);
    console.log('Torrent size:')
    console.log(record.size);


    // new Torrent({
    //   '_id': record.infoHash,
    //   'title': record.name,
    //   'size': ftorrent.length,
    //   'files': ftorrent.files.map(f => f.path),
    //   'imported': new Date()
    // }).save()

	}

});

p2p.listen(6881, '0.0.0.0');
