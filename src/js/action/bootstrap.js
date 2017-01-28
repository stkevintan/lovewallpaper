import { LOAD_METADATA, LOAD_LIST } from '../constants';

const ipcRenderer = require('electron').ipcRenderer;

export function loadMetadata(metadata) {
  return {
    type: LOAD_METADATA,
    metadata,
  };
}

export function loadList(url, path) {
  return (dispatch) => {
    ipcRenderer.send('loadList', url);
    ipcRenderer.on('loadList-reply', (e, metadata) => {
      console.log(metadata);
      dispatch({
        type: LOAD_LIST,
        metadata,
        path,
      });
    });
  };
}
