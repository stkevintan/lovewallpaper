import { ipcRenderer } from 'electron';
import { SET_SIDEBAR_STATUS, SET_SNACKBAR_STATUS, SET_MODAL_STATUS } from '../constants';
import store from '../store';


export function setSidebarStatus(status) {
  return {
    type: SET_SIDEBAR_STATUS,
    show: status,
  };
}

export function setSnackbarStatus(status, message = '', timeout = 4000) {
  return {
    type: SET_SNACKBAR_STATUS,
    show: status,
    message,
    timeout,
  };
}

export function setModalStatus(status, message = '') {
  return {
    type: SET_MODAL_STATUS,
    show: status,
    message,
  };
}

ipcRenderer.on('message', (e, message) => {
  console.log(message);
  // close dialog if necessary
  if (store.getState().getIn(['ui', 'modal', 'show'])) {
    store.dispatch(setModalStatus(false));
  }
  // dispatch action by hand.
  store.dispatch(setSnackbarStatus(true, message));
});
