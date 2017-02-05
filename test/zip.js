const fs = require('fs');
const zip = new (require('node-zip'))();

zip.file('/home/kevin/projects/lovewallpaper/appicons/appicon@128.png');
const data = zip.generate({ base64: false, compression: 'DEFLATE' });
fs.writeFile('test.zip', data, 'binary', (err, ...args) => {
  console.log(err, ...args);
});
