var results = {}
results[1] = {};
results[1].name = 'shit'

console.log(results)
var videoRegex = /(.3g2|.3gp|.amv|.asf|.avi|.drc|.f4a|.f4b|.f4p|.f4v|.flv|.gif|.gifv|.m2v|.m4p|.m4v|.mkv|.mng|.mov|.mp2|.mp4|.mpe|.mpeg|.mpg|.mpv|.mxf|.net|.nsv|.ogv|.qt|.rm|.rmvb|.roq|.svi|.vob|.webm|.wmv|.yuv)$/
var audioRegex = /(.aa|.aac|.aax|.act|.aiff|.amr|.ape|.au|.awb|.dct|.dss|.dvf|.flac|.gsm|.iklax|.ivs|.m4a|.m4b|.mmf|.mp3|.mpc|.msv|.ogg|.opus|.ra|.raw|.sln|.tta|.vox|.wav|.wma|.wv)$/
var documentRegex = /(.cbr|.cbz|.cb7|.cbt|.cba|.djvu|.epub|.fb2|.ibook|.azw|.lit|.prc|.mobi|.pdb|.pdb|.oxps|.xps)$/

var videoFormats = ['.3g2', '.3gp', '.amv', '.asf', '.avi', '.drc', '.f4a', '.f4b', '.f4p', '.f4v', '.flv', '.gif', '.gifv', '.m2v', '.m4p', '.m4v', '.mkv', '.mng', '.mov', '.mp2', '.mp4', '.mpe', '.mpeg', '.mpg', '.mpv', '.mxf', '.net', '.nsv', '.ogv', '.qt', '.rm', '.rmvb', '.roq', '.svi', '.vob', '.webm', '.wmv', '.yuv'];
var audioFormats = ['.aa', '.aac', '.aax', '.act', '.aiff', '.amr', '.ape', '.au', '.awb', '.dct', '.dss', '.dvf', '.flac', '.gsm', '.iklax', '.ivs', '.m4a', '.m4b', '.mmf', '.mp3', '.mpc', '.msv', '.ogg', '.opus', '.ra', '.raw', '.sln', '.tta', '.vox', '.wav', '.wma', '.wv'];
var documentFormats = ['.cbr', '.cbz', '.cb7', '.cbt', '.cba', 'djvu', '.epub', '.fb2', '.ibook', '.azw', '.lit', '.prc', '.mobi', '.pdb', '.pdb', '.oxps', '.xps'];

var file = 'Shert.yuv';
if(videoRegex.test(file) == true){
  console.log("VIDEO");
}

var array = [];
  array[1] = "S";
  array[2] = "H";
  array[3] = "I";
  array[4] = "T";

array.forEach(function(element){
  console.log(element)
})

console.log(array)

var navActive = new Map;
navActive.set('all', 'active');
navActive.set('video', 'inactive');
navActive.set('audio', 'inactive');
navActive.set('doc', 'inactive');
navActive.set('exe', 'inactive');
navActive.set('other', 'inactive');

console.log(navActive);

var torrents = {
  b134d4c1165cb9feb6ee9d3f3bfefb5d5142924c:
   { announce: 'udp://tracker.coppersurfer.tk:6969/announce',
     infoHash: 'b134d4c1165cb9feb6ee9d3f3bfefb5d5142924c',
     complete: 0,
     downloaded: 86,
     incomplete: 5 },
  ed5fadf03f9dfd9c2efbbfebbd5132509c20fcf1:
   { announce: 'udp://tracker.coppersurfer.tk:6969/announce',
     infoHash: 'ed5fadf03f9dfd9c2efbbfebbd5132509c20fcf1',
     complete: 1,
     downloaded: 0,
     incomplete: 0 },
  ed4aac5cbf9030ac66f725057148e03f8af89607:
   { announce: 'udp://tracker.coppersurfer.tk:6969/announce',
     infoHash: 'ed4aac5cbf9030ac66f725057148e03f8af89607',
     complete: 0,
     downloaded: 0,
     incomplete: 0 },
  '6fdecc7d3762730ac0bf52912b255783ebf1699d':
   { announce: 'udp://tracker.coppersurfer.tk:6969/announce',
     infoHash: '6fdecc7d3762730ac0bf52912b255783ebf1699d',
     complete: 1,
     downloaded: 435,
     incomplete: 0 },
  acd5e67e093b1cc98d340c3628b34b712105759c:
   { announce: 'udp://tracker.coppersurfer.tk:6969/announce',
     infoHash: 'acd5e67e093b1cc98d340c3628b34b712105759c',
     complete: 0,
     downloaded: 0,
     incomplete: 3 }
}

for (var key in torrents){
  console.log(torrents[key].complete);
  console.log(torrents[key].incomplete);
}
