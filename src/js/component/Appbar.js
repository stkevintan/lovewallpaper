import React from 'react';
import AppBar from 'material-ui/AppBar';
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
  handlerNavBtnClick() {
    this.props.setSidebarStatus();
  }
  render() {
    return (
      <AppBar
        onLeftIconButtonTouchTap={this.handlerNavBtnClick.bind(this)}
        className="navbar"
        title="Make Wallpaper Great Again"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
      />
    );
  }
}
