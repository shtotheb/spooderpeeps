'use strict';

const mongoose = require('mongoose');
const Records = require('./schemes/Records.js');

mongoose.connect('mongodb://siamang1945:siamang1945@ds143000.mlab.com:43000/siamang_test');

var P2PSpider = require('./lib');

var p2p = P2PSpider({
    // nodesMaxSize: 200,   // be careful
    // maxConnections: 400, // be careful
    // timeout: 5000
    nodesMaxSize: 20000,   // be careful
    maxConnections: 40000, // be careful
    timeout: 5000
});

p2p.ignore(function (infohash, rinfo, callback) {
    var theInfohashIsExistsInDatabase = false;
    callback(theInfohashIsExistsInDatabase);
});

var savedCallback = function(name) {
  console.log(name);
}

p2p.on('metadata', function (metadata) {

  if(typeof metadata.info.name !== 'undefined' && typeof metadata.info.files !== 'undefined'){

    console.log("Metadata found!!  ", metadata.info.name.toString());

    var tempSearch = metadata.info.name.toString();
    var record = 0;

    metadata.info.files.forEach(function(element){
      record = record + element.length;
    });


    Records.findByIdAndUpdate(
      metadata.infohash, {
        '_id': metadata.infohash,
        'name': metadata.info.name.toString(),
        'search': tempSearch.replace(/\.|\_/g, ' '),
        'magnet': metadata.magnet,
        'size': record,
        'files': {
          'path': metadata.info.files.map(f => f.path),
          'length': metadata.info.files.map(f => f.length)
        },
        'imported': new Date(),
        'updated': new Date()
      },
      {upsert: true, setDefaultsOnInsert: true, new: true, runValidators: true },
      function (err, doc) {
          if (err) {
              console.log(err)
          } else {
              console.log("Metadata = { ", metadata.info.name.toString(), " } is Saved!")
          }
      }
    )

  }

});

p2p.listen(6881, '0.0.0.0');
