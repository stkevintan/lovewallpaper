import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import { connect } from 'react-redux';

const mapStateToProps = state => ({
  show: state.sidebar.show,
});

@connect(mapStateToProps)
export default class extends React.Component {
  static propTypes={
    show: React.PropTypes.bool.isRequired,
  }
  render() {
    return (
      <div>
        <Drawer
          docked={false}
          width={600}
          open={this.props.show}
        >
          <MenuItem>Menu Item</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
        </Drawer>
      </div>
    );
  }
}
