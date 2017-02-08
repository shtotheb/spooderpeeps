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

    console.log(metadata.info.name.toString());
    console.log(count += 1);

});

p2p.listen(6881, '0.0.0.0');
