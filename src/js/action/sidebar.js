import { SET_SIDEBAR_STATUS } from '../constants';

export function setSidebarStatus(status) {
  return {
    type: SET_SIDEBAR_STATUS,
    show: status,
  };
}
