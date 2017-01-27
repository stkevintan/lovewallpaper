import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { setSidebarStatus } from '../action/sidebar';


const mapStateToProps = state => ({
  show: state.sidebar.show,
});
const mapDisPatcherToProps = dispatch => bindActionCreators({
  setSidebarStatus,
}, dispatch);
@connect(mapStateToProps, mapDisPatcherToProps)
export default class extends React.Component {
  static propTypes={
    show: React.PropTypes.bool.isRequired,
    setSidebarStatus: React.PropTypes.func.isRequired,
  }
  render() {
    return (
      <div>
        <Drawer
          docked={false}
          width={400}
          open={this.props.show}
          onRequestChange={() => this.props.setSidebarStatus(false)}
        >
          <MenuItem>Menu Item</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
        </Drawer>
      </div>
    );
  }
}
