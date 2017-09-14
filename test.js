const getMediaList = require('./index');
const list = getMediaList();
console.log(JSON.stringify(list, null, '  '));