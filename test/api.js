const API = require('../backend/api');

const api = new API();

api.load().then((json) => {
  console.log(json);
});
