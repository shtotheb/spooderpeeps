watcher.on("add", (metadata) => {
  return new Promise((resolve, reject) => {
    Records.findById(metadata.infohash, function(err, doc){
      if (err) {
        reject(err)
      }
      resolve(ftorrent);
    })
    rt(fsfile, (err, ftorrent) => {
      if(err) {
        reject(err)
      }
      resolve(ftorrent);
    })
  })
  .then(ftorrent => [ftorrent, Torrent.findById(ftorrent.infoHash).exec()])
  .spread((ftorrent, res) => (res) ? Promise.reject("TEXISTS") : Promise.resolve(ftorrent))
  .then(ftorrent => {
    return [ftorrent, new Torrent({
      '_id': ftorrent.infoHash,
      'title': ftorrent.name,
      'details': ftorrent.announce,
      'size': ftorrent.length,
      'files': ftorrent.files.map(f => f.path),
      'imported': new Date()
    }).save()]
  })
  .spread((ftorrent, res) => Promise.resolve(logger.info(`File ${ftorrent.infoHash} added ${count+=1}`)))
  .catch(err => (err==="TEXISTS") ? Promise.resolve(logger.info(`File ${fsfile} already loaded`)) : Promise.reject(err))
  .then(() => fs.unlinkAsync(fsfile))
  .catch(err => Promise.reject(logger.error(err)))
});
