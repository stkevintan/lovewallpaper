const path = require('path');
const Immutable = require('immutable');
const pkgconf = require('./package.json');

const template = Immutable.fromJS({
  dir: __dirname,
  arch: 'x64',
  asar: true,
  ignore: [/src/, /\.vscode/, /test/, /tsconfig\.json/, /README\.md/, /\s+\.config\.js/, /flyfile/],
  out: path.join(__dirname, `/production/${pkgconf.version}`),
  overwrite: true,
  name: `${pkgconf.name}`,
});


exports.linux = template.merge({
  icon: path.join(__dirname, '/appicons/appicon@128.png'),
  platform: 'linux',
}).toJS();

exports.osx = template.merge({
  icon: path.join(__dirname, '/appicons/appicon@128.icns'),
  platform: 'darwin',
  'app-category-type': 'public.app-category.photography',
}).toJS();

exports.win = template.merge({
  icon: path.join(__dirname, '/appicons/appicon@128.ico'),
  platform: 'win32',
}).toJS();
