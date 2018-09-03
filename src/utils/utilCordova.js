export function getFile(path, successCb, failCb) {
  window.resolveLocalFileSystemURL(path, function (fileEntry) {
    successCb(fileEntry)
  }, function (e) {
    // on Androi, need to loop
    let dirEntry = function (entry) {
      let dirReader = entry.createReader()
      dirReader.readEntries(
        function (entries) {
          Array.from(entries).forEach(function (n, i) {
            if (n.isDirectory === true) {
              if (n.nativeURL.indexOf('/cacheCompressHelper') > -1 || n.nativeURL.indexOf('/Documents') > -1) {
                var dirReader2 = n.createReader()
                dirReader2.readEntries(function (files) {
                  // found the target /res directory
                  Array.from(files).forEach(function (f, i) {
                    if (f.isFile && f.nativeURL.indexOf(path) >= 0) {
                      successCb(f)
                    }
                  })
                })
                // no need to iterate more
                return false
              } else {
                // Recursive -- call back into this subdirectory
                dirEntry(n)
              }
            }
          })
        }, (error) => {
          failCb(error, 3)
        })
    }
    window.resolveLocalFileSystemURL(window.cordova.file.applicationStorageDirectory, dirEntry, (error) => {
      failCb(error, 4)
    })
  })
}
