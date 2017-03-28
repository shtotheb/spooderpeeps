watcher.on("add", (metadata) => {
  return new Promise((resolve, reject) => {
    Records.findById(metadata.infohash, function(err, doc){
      if (err) {
        reject(err)
      }
      if (doc ===  null) {
        exists=false;
        resolve(metadata);
      };
    })
  })
  .then(metadata => {
    if(typeof metadata.info.name !== 'undefined' && typeof metadata.info.files !== 'undefined' && exists === false){
      var tempSearch = metadata.info.name.toString();
      var record = 0;

  		if(typeof metadata.info.files !== 'undefined' && metadata.info.files.length < 100){
  			var record = [];
  			metadata.info.files.forEach(function(element){
            record = record + element.length;
  			});
  		}

      var newRecord = new Records({
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
      });

      newRecord.save(function (err, newRecord) {
        if (err) return console.error(err);
        console.log(newRecord.name, " metadata saved!")
      });

  	}
  })
});
