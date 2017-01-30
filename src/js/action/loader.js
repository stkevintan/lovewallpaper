import { ipcRenderer } from 'electron';
import { LOAD_METADATA, LOAD_LIST } from '../constants';

export function loadMetadata() {
  return (dispatch) => {
    ipcRenderer.on('load-metadata-reply', (e, metadata) => {
      // normalize metadata
      Object.keys(metadata).forEach((key) => {
        const value = metadata[key];
        if (typeof value === 'string') {
          metadata[key] = {
            url: value,
          };
        }
      });
      dispatch({
        type: LOAD_METADATA,
        metadata,
      });
    });
    ipcRenderer.send('load-metadata');
  };
}

export function loadList(url, position) {
  return (dispatch) => {
    // cannot use on.
    ipcRenderer.once('load-list-reply', (e, metadata) => {
      for (const data of metadata.data) {
        data.small = data.small.replace(/(\/\d+),\d+,\d+/, '$1,250,250');
      }
      dispatch({
        type: LOAD_LIST,
        content: metadata,
        position,
      });
    });

    ipcRenderer.send('load-list', url);
  };
}
