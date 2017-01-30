import { ipcRenderer } from 'electron';
import { SET_SIDEBAR_STATUS, SET_SNACKBAR_STATUS } from '../constants';
import store from '../store';

ipcRenderer.on('message', (e, message) => {
  console.log(message);
  // dispatch action by hand.
  store.dispatch({
    type: SET_SNACKBAR_STATUS,
    show: true,
    message,
  });
});
export function setSidebarStatus(status) {
  return {
    type: SET_SIDEBAR_STATUS,
    show: status,
  };
}

export function setSnackbarStatus(status, message = '') {
  return {
    type: SET_SNACKBAR_STATUS,
    show: status,
    message,
  };
}

