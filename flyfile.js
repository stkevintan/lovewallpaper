const proc = require('child_process');
const archiver = require('archiver');
const fs = require('fs');
const electron = require('electron');
const webpack = require('webpack');
const packager = require('electron-packager');
const webpackConfig = require('./webpack.config');

let isProd = false;
const PATH = {
  page: {
    source: 'src/**/*.html',
    target: 'dist',
  },
  style: {
    source: 'src/css/app.less',
    watchSource: 'src/css/**/*.less',
    target: 'dist/assets/css',
  },
  script: {
    source: 'src/js/app.js',
    watchSource: 'src/js/**/*.js',
    target: 'dist/assets/js',
  },
};

export default async function() {
  await this.start('watch');
  const win = proc.spawn(electron, ['.']);
  win.stdout.on('data', data => this.log(data.toString()));
  win.stderr.on('data', data => this.error(data.toString()));
  win.on('exit', code => this.log(`child process exited with code ${code}`));
}

export async function clean() {
  return await this.clear('dist');
}


export async function build() {
  await this.start(['script', 'page', 'style'], { parallel: true });
}

export async function release() {
  isProd = true;
  return await this.start(['clean', 'build']);
}

function generator(platform) {
  const platforms = Array.isArray(platform) ? platform : [platform];
  return async function() {
    await this.start('release');
    const ps = platforms.map(p => new Promise((resolve, reject) => {
      packager(require('./build.config')[p], (err, appPath) => {
        if (err) {
          reject(err);
          this.error(err);
        } else {
          // compres
          appPath = appPath[0];
          const output = fs.createWriteStream(`${appPath}.zip`);
          const archive = archiver('zip');
          output.on('close', () => resolve(appPath));
          output.on('error', error => reject(error));
          archive.pipe(output);
          archive.directory(appPath, '/');
          // finalize the archive (ie we are done appending files but streams have to finish yet)
          archive.finalize();
        }
      });
    }));
    const paths = await Promise.all(ps);
    paths.forEach((p) => {
      this.log(`Package was generated at ${p}`);
    });
  };
}

export const linux = generator('linux');
export const win = generator('win');
export const osx = generator('osx');
export const all = generator(['linux', 'win', 'osx']);

export async function script() {
  if (isProd) {
    webpackConfig.devtool = undefined;
    webpackConfig.watch = false;
    webpackConfig.plugins.push(new webpack.optimize.DedupePlugin());
    webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({ comments: false, output: '' }));
  }
  webpackConfig.output.path = PATH.script.target;
  await this.source(PATH.script.source)
  .webpack(webpackConfig, null, (err, stats) => {
    if (err) this.log(err, stats);
  });
}

export async function page() {
  await this.source(PATH.page.source)
  .target(PATH.page.target);
}

export async function style() {
  let ret = this.source(PATH.style.source)
  .less({
    paths: 'src/css',
  });
  if (isProd) {
    ret = ret.postcss({
      plugins: [
        require('cssnano'),
      ],
      options: {
      },
    });
  }
  await ret.target(PATH.style.target, { depth: 0 });
}

export async function watch() {
  await this.watch(PATH.page.source, 'page', { parallel: true });
  await this.watch(PATH.style.watchSource, 'style', { parallel: true });
  this.start(['script'], { parallel: true });
}
