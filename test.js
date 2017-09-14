const getMediaList = require('./index');
const list = getMediaList();
console.log(JSON.stringify(list, null, '  '));

getMediaList((err, data) => {
  if (err) return;
  console.log(data);
});