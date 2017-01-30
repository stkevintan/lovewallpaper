const API = require('../backend/api');

const api = new API();

// api.load().then((json) => {
//   console.log(json);
// });

api.download('http://s.qdcdn.com/cl/14320107,256,256.jpg').then(path => console.log('success', path));

// failed
// api.download('http://keyinasdfgfds.com').then(path => console.log('success', path)).catch(err => console.log('download failed', err));
