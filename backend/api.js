const fetch = require('node-fetch');
const url = require('url');

const hostname = 'open.lovebizhi.com/baidu_rom.php';


const defaultOpts = {
  width: '1920',
  height: '1080',
};

module.exports = class API {
  constructor(opts) {
    opts = Object.assign(defaultOpts, opts || {});
    this.width = opts.width;
    this.height = opts.height;
    this.initial = false;
  }
  load({ width, height }) {
    const query = { width: width || this.width, height: height || this.height };
    console.log(url.format({
      protocol: 'http',
      hostname,
      query,
    }));
    return fetch(url.format({
      protocol: 'http',
      hostname,
      query,
    })).then(res => res.json())
      .then((json) => {
        console.log('fetch done');
        this.initial = true;
        this.urlMap = json;
        // console.log(this, this.urlMap);
        return json;
      }).catch(err => console.log('fetch failed', err));
  }
  fetch(destUrl) {
    return fetch(destUrl).then(res => res.json());
  }
};
