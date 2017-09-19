const getMediaList = require('./index');

getMediaList()
  .then(data => {
    console.log(JSON.stringify(data, null, '  '));
  });

/*[{
  "udid": "disk2",
  "name": "UDisk",
  "type": "Generic",
  "node": "/dev/disk2",
  "size": "15.9 GB",
  "size_bytes": 15938355200,
  "volumes": [{
    "udid": "disk2",
    "mount": "/Volumes/DBand",
    "size": "15.9 GB",
    "size_bytes": 15938355200,
    "name": "DBand",
    "node": "/dev/disk2",
    "fs_type": "msdos",
    "fs_name": "MS-DOS FAT32",
    "free": "15.9 GB",
    "free_bytes": 15914958848,
    "writable": true
  }]
}, {
  "udid": "disk3",
  "name": "Flash Disk",
  "type": "Generic",
  "node": "/dev/disk3",
  "size": "4.0 GB",
  "size_bytes": 4026531840,
  "volumes": [{
    "udid": "disk3s4",
    "mount": "/Volumes/Untitled",
    "size": "4.0 GB",
    "size_bytes": 4026467328,
    "name": "Untitled",
    "node": "/dev/disk3s4",
    "fs_type": "ntfs",
    "fs_name": "NTFS",
    "free": "4.0 GB",
    "free_bytes": 4011507712,
    "writable": false
  }]
}]*/
