const proc = require('child_process');
const electron = require('electron');
const webpackConfig = require('./webpack.config');

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

webpackConfig.output.path = PATH.script.target;

export default async function() {
  await this.start('watch');
  proc.spawn(electron, ['.']);
}

export async function script() {
  await this.source(PATH.script.source)
  .webpack(webpackConfig, null, (err, stats) => {
    if (err) console.log(err, stats);
  });
}

export async function page() {
  await this.source(PATH.page.source)
  .target(PATH.page.target);
}
export async function build() {
  await this.start(['script', 'page'], { parallel: true });
}

export async function style() {
  await this.source(PATH.style.source)
  .less({
    paths: 'src/css',
  })
  .target(PATH.style.target, { depth: 0 });
}

export async function watch() {
  await this.watch(PATH.page.source, 'page', { parallel: true });
  await this.watch(PATH.style.watchSource, 'style', { parallel: true });
  this.start(['script'], { parallel: true });
}
