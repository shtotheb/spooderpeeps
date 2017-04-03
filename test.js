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
