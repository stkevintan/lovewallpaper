import React from 'react';
import AppBar from 'material-ui/AppBar';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setSidebarStatus } from '../action/ui';

import Controls from './Controls';

const mapDispatchToProps = dispatch => bindActionCreators({
  setSidebarStatus,
}, dispatch);

@connect(null, mapDispatchToProps)
export default class Appbar extends React.Component {
  static propTypes = {
    setSidebarStatus: React.PropTypes.func.isRequired,
  };
  render() {
    return (
      <AppBar
        titleStyle={{ WebkitAppRegion: 'drag', WebkitUserSelect: 'none' }}
        iconElementRight={<Controls />}
        onLeftIconButtonTouchTap={() => this.props.setSidebarStatus()}
        className="navbar"
        title="Make Wallpaper Great Again"
      />
    );
  }
}
