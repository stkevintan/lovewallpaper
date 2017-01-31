import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Snackbar from 'material-ui/Snackbar';
import { setSnackbarStatus } from '../action/ui';

const mapStateToProps = state => state.getIn(['ui', 'snackbar']).toObject();
const mapDispatchToProps = dispatch => bindActionCreators({ setSnackbarStatus }, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class extends React.Component {
  handleRequestClose = () => {
    this.props.setSnackbarStatus(false);
  };

  render() {
    return (
      <Snackbar
        open={this.props.show}
        message={this.props.message}
        autoHideDuration={this.props.timeout}
        onRequestClose={this.handleRequestClose.bind(this)}
      />
    );
  }
}
