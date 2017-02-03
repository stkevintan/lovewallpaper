import React from 'react';
import { ipcRenderer } from 'electron';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';
import Reload from 'material-ui/svg-icons/navigation/refresh';
import Minimize from 'material-ui/svg-icons/content/remove';
import Maximize from 'material-ui/svg-icons/navigation/fullscreen';
import Unmaximize from 'material-ui/svg-icons/navigation/fullscreen-exit';

export default class extends React.Component {
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
    return (
      <div>
        <IconButton
          // tooltip="Minimize"
          iconStyle={{ color: '#fff' }}
          onTouchTap={() => this.handleControl('minimize')}
        ><Minimize /></IconButton>
        <IconButton
          // tooltip="Reload"
          iconStyle={{ color: '#fff' }}
          onTouchTap={() => this.handleControl('reload')}
        ><Reload /></IconButton>
        <IconButton
          // tooltip={this.state.maximized ? 'Unmaximize' : 'Maximize'}
          iconStyle={{ color: '#fff' }}
          onTouchTap={() => this.handleControl('toggle')}
        >
          {this.state.maximized ? <Unmaximize /> : <Maximize />}
        </IconButton>
        <IconButton
          // tooltip="Close"
          iconStyle={{ color: '#fff' }}
          onTouchTap={() => this.handleControl('close')}
        ><Close /></IconButton>
      </div>
    );
  }
}
