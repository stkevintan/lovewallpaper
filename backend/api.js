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
  load() {
    const query = { width: this.width, height: this.height };
    return fetch(url.format({
      protocol: 'http',
      hostname,
      query,
    })).then(res => res.json())
      .then((json) => {
        this.initial = true;
        this.urlMap = json;
        // console.log(this, this.urlMap);
        return json;
      });
  }
};
