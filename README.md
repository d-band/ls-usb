ls-usb
======

> List USB media storage for macOS


[![NPM version](https://img.shields.io/npm/v/ls-usb.svg)](https://www.npmjs.com/package/ls-usb)
[![NPM downloads](https://img.shields.io/npm/dm/ls-usb.svg)](https://www.npmjs.com/package/ls-usb)

---

## Install

```bash
$ npm install ls-usb
```

## Usage

```javascript
const getMediaList = require('./index');
const list = getMediaList();
console.log(JSON.stringify(list, null, '  '));

/**
 * output:
 *
 * [
 *   {
 *     "name": "Flash Disk",
 *     "path": "/dev/disk2",
 *     "size": "4.03 GB",
 *     "size_bytes": 4026531840,
 *     "volumes": [
 *       {
 *         "name": "Media A",
 *         "path": "/dev/disk2s4",
 *         "type": "NTFS",
 *         "size": "4.03 GB",
 *         "size_bytes": 4026467328,
 *         "free": "4.01 GB",
 *         "free_bytes": 4011507712,
 *         "mount": "/Volumes/Media A",
 *         "writable": false
 *       }
 *     ]
 *   },
 *   {
 *     "name": "TransMemory",
 *     "path": "/dev/disk3",
 *     "size": "7.8 GB",
 *     "size_bytes": 7803174912,
 *     "volumes": [
 *       {
 *         "name": "NO NAME",
 *         "path": "/dev/disk3s1",
 *         "type": "MS-DOS FAT32",
 *         "size": "7.8 GB",
 *         "size_bytes": 7803142656,
 *         "free": "4.89 GB",
 *         "free_bytes": 4886757376,
 *         "mount": "/Volumes/NO NAME",
 *         "writable": true
 *       }
 *     ]
 *   }
 * ]
 */
```

## Report a issue

* [All issues](https://github.com/d-band/ls-usb/issues)
* [New issue](https://github.com/d-band/ls-usb/issues/new)

## License

ls-usb is available under the terms of the MIT License.
