var _ = require('lodash');

const mongoose = require('mongoose');
const Records = require('./schemes/Records.js');

mongoose.connect('mongodb://siamang1945:siamang1945@ds143000.mlab.com:43000/siamang_test');

var videoFormats = ['.3g2', '.3gp', '.amv', '.asf', '.avi', '.drc', '.f4a', '.f4b', '.f4p', '.f4v', '.flv', '.gif', '.gifv', '.m2v', '.m4p', '.m4v', '.mkv', '.mng', '.mov', '.mp2', '.mp4', '.mpe', '.mpeg', '.mpg', '.mpv', '.mxf', '.net', '.nsv', '.ogv', '.qt', '.rm', '.rmvb', '.roq', '.svi', '.vob', '.webm', '.wmv', '.yuv'];
var audioFormats = ['.aa', '.aac', '.aax', '.act', '.aiff', '.amr', '.ape', '.au', '.awb', '.dct', '.dss', '.dvf', '.flac', '.gsm', '.iklax', '.ivs', '.m4a', '.m4b', '.mmf', '.mp3', '.mpc', '.msv', '.ogg', '.opus', '.ra', '.raw', '.sln', '.tta', '.vox', '.wav', '.wma', '.wv'];
var documentFormats = ['.cbr', '.cbz', '.cb7', '.cbt', '.cba', 'djvu', '.epub', '.fb2', '.ibook', '.azw', '.lit', '.prc', '.mobi', '.pdb', '.pdb', '.oxps', '.xps'];
var inactivateFormats = ['.wmv', '.wma', '.z'];

var search = function(){
  Records.find({}, function(err, torrents) {
    if (err) res.send(err);
    return(torrents);
  }).limit(10)
  .then( function (torrents) {
    if(torrents.length == 0){
        setTimeout(function(){
            console.log('=====================================================');
            console.log('Did not find any torrents that do not have categories');
            console.log('=====================================================');
            search();
        }, 5000);
    }

    categorize(torrents);

  }, function (err) {
      console.log(err);
    }
  );

}

var categorize = function(torrents){
    var results = {};

    torrents.forEach(function(element){
      try{
        var record = element;
        results[element.infohash] = {};
        results[element.infohash].type = '';
        results[element.infohash].categories = [];
        results[element.infohash].tags = [];
        var files = [];
        if(typeof element.files != 'undefined'){
            for(var key in element.files){
                files.push(element.files[key].path);
            }
        }
        files.push(element.name);
        for(var j = 0; j < files.length; j++){
            var file = files[j];
        }

      }catch(error){
        console.log(error);
      }
    });
    update(results);
}

search();
