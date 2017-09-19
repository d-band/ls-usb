const plist = require('fast-plist');
const cp = require('child_process');

function execAsync(cmd) {
  return new Promise((resolve, reject) => {
    cp.exec(cmd, (err, stdout) => {
      if (err) return reject(err);
      return resolve(stdout);
    })
  });
}

function execWithParse(cmd) {
  return execAsync(cmd).then(plist.parse);
}

function humanFileSize(bytes, si) {
  const thresh = si ? 1000 : 1024;
  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }
  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  do {
    bytes /= thresh;
    ++u;
  } while (Math.abs(bytes) >= thresh && u < units.length - 1);
  return bytes.toFixed(1) + ' ' + units[u];
}

function getMediaList() {
  return execWithParse('diskutil list -plist external').then(data => {
    const temp = {};
    const disks = data.WholeDisks.map((udid, index) => {
      temp[udid] = index;
      return {
        udid,
        volumes: []
      };
    });
    data.AllDisksAndPartitions.forEach(disk => {
      const udid = disk.DeviceIdentifier;
      if (disk.Partitions) {
        disks[temp[udid]].volumes = disk.Partitions.map(v => ({
          udid: v.DeviceIdentifier,
          mount: v.MountPoint,
          size: humanFileSize(v.Size, true),
          size_bytes: v.Size,
          name: v.VolumeName
        }));
      } else if (disk.MountPoint && disk.VolumeName) {
        disks[temp[udid]].volumes.push({
          udid: udid,
          mount: disk.MountPoint,
          size: humanFileSize(disk.Size, true),
          size_bytes: disk.Size,
          name: disk.VolumeName
        });
      }
    });
    return Promise.all(
      data.AllDisks.map(v => execWithParse(`diskutil info -plist ${v}`))
    ).then(infoList => {
      const infoMap = infoList.reduce((prev, cur) => {
        prev[cur.DeviceIdentifier] = cur;
        return prev;
      }, {});
      return disks.map(disk => {
        const udid = disk.udid;
        const info = infoMap[udid] || {};
        return {
          udid,
          name: info.MediaName,
          type: info.MediaType,
          node: info.DeviceNode,
          size: humanFileSize(info.Size, true),
          size_bytes: info.Size,
          volumes: disk.volumes.map(v => {
            const vinfo = infoMap[v.udid] || {};
            return Object.assign(v, {
              node: vinfo.DeviceNode,
              fs_type: vinfo.FilesystemType,
              fs_name: vinfo.FilesystemName,
              free: humanFileSize(vinfo.FreeSpace, true),
              free_bytes: vinfo.FreeSpace,
              writable: vinfo.Writable
            });
          })
        };
      });
    });
  });
}

exports = module.exports = getMediaList;
exports.execAsync = execAsync;
exports.execWithParse = execWithParse;
exports.humanFileSize = humanFileSize;
