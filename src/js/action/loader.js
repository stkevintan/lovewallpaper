import { ipcRenderer } from 'electron';
import { LOAD_METADATA, LOAD_LIST, LOAD_MORE, SET_SNACKBAR_STATUS } from '../constants';

export function loadMetadata() {
  return (dispatch) => {
    ipcRenderer.once('load-metadata-reply', (e, metadata = {}) => {
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
    ipcRenderer.once('load-list-reply', (e, metadata = {}) => {
      for (const data of metadata.data || []) {
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
export function loadMore(url, position) {
  return (dispatch) => {
    ipcRenderer.once('load-more-reply', (e, metadata = {}) => {
      for (const data of metadata.data || []) {
        data.small = data.small.replace(/(\/\d+),\d+,\d+/, '$1,250,250');
      }
      dispatch({
        type: LOAD_MORE,
        content: metadata,
        position,
      });
      // close snackbar
      dispatch({
        type: SET_SNACKBAR_STATUS,
        show: false,
      });
      window.CanSendLoadMoreSignal = true;
    });
    ipcRenderer.send('load-more', url);
  };
}
