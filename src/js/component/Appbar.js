import React from 'react';
import AppBar from 'material-ui/AppBar';
import { ipcRenderer } from 'electron';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';
import Minimize from 'material-ui/svg-icons/content/remove';
import Maximize from 'material-ui/svg-icons/navigation/fullscreen';
import Unmaximize from 'material-ui/svg-icons/navigation/fullscreen-exit';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setSidebarStatus } from '../action/ui';

const mapDispatchToProps = dispatch => bindActionCreators({
  setSidebarStatus,
}, dispatch);

@connect(null, mapDispatchToProps)
export default class extends React.Component {
  static propTypes = {
    setSidebarStatus: React.PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = {
      maximized: false,
    };
  }
  handleControl(type) {
    if (type === 'toggle') {
      type = this.state.maximized ? 'unmaximize' : 'maximize';
      this.setState({ maximized: !this.state.maximized });
    }
    ipcRenderer.send('control-window', type);
  }

  render() {
    const controls = (
      <div>
        <IconButton
          iconStyle={{ color: '#fff' }}
          onTouchTap={() => this.handleControl('minimize')}
        ><Minimize /></IconButton>
        <IconButton
          iconStyle={{ color: '#fff' }}
          onTouchTap={() => this.handleControl('toggle')}
        >
          {this.state.maximized ? <Unmaximize /> : <Maximize />}
        </IconButton>
        <IconButton
          iconStyle={{ color: '#fff' }}
          onTouchTap={() => this.handleControl('close')}
        ><Close /></IconButton>
      </div>
    );
    return (
      <AppBar
        titleStyle={{ WebkitAppRegion: 'drag', WebkitUserSelect: 'none' }}
        iconElementRight={controls}
        onLeftIconButtonTouchTap={() => this.props.setSidebarStatus()}
        className="navbar"
        title="Make Wallpaper Great Again"
      />
    );
  }
}
