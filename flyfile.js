const proc = require('child_process');
const electron = require('electron');
const webpack = require('webpack');
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
  win.stdout.on('data', data => console.log(data.toString()));
  win.stderr.on('data', data => console.error(data.toString()));
  win.on('exit', code => console.log(`child process exited with code ${code}`));
}
const switchPATH = (from, to) => {
  const Q = [PATH];
  while (Q.length > 0) {
    const front = Q.shift();
    Object.keys(front).forEach((key) => {
      if (!front[key]) return; // exclude null,[],'',undefined
      if (typeof front[key] === 'object') {
        Q.push(front[key]);
        return;
      }
      if (typeof front[key] !== 'string') return;
      front[key] = front[key].replace(from, to);
    });
  }
};

export async function release() {
  isProd = true;
  switchPATH('dist', 'release');
  return await this.start(['script', 'page', 'style'], { parallel: true });
}

export async function script() {
  if (isProd) {
    webpackConfig.devtool = undefined;
    webpackConfig.watch = false;
    webpackConfig.plugins.push(new webpack.optimize.DedupePlugin());
    webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({ comments: false }));
  }
  webpackConfig.output.path = PATH.script.target;
  await this.source(PATH.script.source)
  .webpack(webpackConfig, null, (err, stats) => {
    if (err) console.log(err, stats);
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
