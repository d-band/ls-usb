const plist = require('fast-plist');
const shell = require('shelljs');

function getMediaList() {
  const res = shell.exec('system_profiler -xml SPUSBDataType', {
    silent: true
  });
  const data = plist.parse(res.stdout);
  const medias = [];
  if (data.length && data[0]._items && data[0]._items.length) {
    data[0]._items.forEach(device => {
      if (!device._items) return;
      device._items.forEach(media => {
        if (!media.Media) return;
        media.Media.forEach(item => {
          if (!item.removable_media) return;
          const tmp = {
            name: item._name,
            path: `/dev/${item.bsd_name}`,
            size: item.size,
            size_bytes: item.size_in_bytes
          };
          tmp.volumes = (item.volumes || []).map(v => ({
            name: v._name,
            path: `/dev/${v.bsd_name}`,
            type: v.file_system,
            size: v.size,
            size_bytes: v.size_in_bytes,
            free: v.free_space,
            free_bytes: v.free_space_in_bytes,
            mount: v.mount_point,
            writable: v.writable === 'yes'
          }));
          if (tmp.volumes.length) {
            medias.push(tmp);
          }
        });
      });
    });
  }
  return medias;
}

module.exports = getMediaList;
