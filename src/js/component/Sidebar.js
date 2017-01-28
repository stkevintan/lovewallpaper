import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { setSidebarStatus } from '../action/sidebar';


const mapStateToProps = state => ({
  show: state.sidebar.show,
  category: state.metadata.category,
});
const mapDisPatcherToProps = dispatch => bindActionCreators({
  setSidebarStatus,
}, dispatch);
@connect(mapStateToProps, mapDisPatcherToProps)
export default class extends React.Component {
  static propTypes={
    show: React.PropTypes.bool.isRequired,
    setSidebarStatus: React.PropTypes.func.isRequired,
    category: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      url: React.PropTypes.string.isRequired,
      cover: React.PropTypes.string,
    })).isRequired,
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
          {
            this.props.category.map(cat => (
              <MenuItem key={cat.name}>{cat.name}</MenuItem>
            ))
          }
        </Drawer>
      </div>
    );
  }
}
