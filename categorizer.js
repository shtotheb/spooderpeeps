const mongoose = require('mongoose');
const Records = require('./schemes/Records.js');

mongoose.connect('mongodb://siamang1945:siamang1945@ds143000.mlab.com:43000/siamang_test');

var videoRegex = /(.3g2|.3gp|.amv|.asf|.avi|.drc|.f4a|.f4b|.f4p|.f4v|.flv|.gif|.gifv|.m2v|.m4p|.m4v|.mkv|.mng|.mov|.mp2|.mp4|.mpe|.mpeg|.mpg|.mpv|.mxf|.net|.nsv|.ogv|.qt|.rm|.rmvb|.roq|.svi|.vob|.webm|.wmv|.yuv)$/
var audioRegex = /(.aa|.aac|.aax|.act|.aiff|.amr|.ape|.au|.awb|.dct|.dss|.dvf|.flac|.gsm|.iklax|.ivs|.m4a|.m4b|.mmf|.mp3|.mpc|.msv|.ogg|.opus|.ra|.raw|.sln|.tta|.vox|.wav|.wma|.wv)$/
var documentRegex = /(.cbr|.cbz|.cb7|.cbt|.cba|.djvu|.epub|.fb2|.ibook|.azw|.lit|.prc|.mobi|.pdb|.pdb|.oxps|.xps)$/

var search = function(){
  Records.find({}, function(err, torrents) {
    if (err) res.send(err);
    return(torrents);
  }).limit(100)
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
        results[element.infohash].categories = '';
        results[element.infohash].tags = [];
        var filez = [];
        if(typeof element.files != 'undefined'){
            for(var i = 0; i < element.files.path.length; i++){
                filez.push(element.files.path[i]);
            }
        }
        for(var j = 0; j < filez.length; j++){
            var file = filez[j];
            results[element.infohash] = getType(file, results[element.infohash]);
        }

      }catch(error){
        console.log(error);
      }

      console.log(element.name, " === ", results[element.infohash].categories)
    });
    // update(results);
}

var getType = function(file, element){
  if(videoRegex.test(file) == true && element.categories == ''){ element.categories = 'video'; }
  if(audioRegex.test(file) == true && element.categories == ''){ element.categories = 'audio'; }
  if(audioRegex.test(file) == true && element.categories == ''){ element.categories = 'doc'; }
  return element;
}

search();
