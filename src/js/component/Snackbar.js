import React from 'react';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Snackbar from 'material-ui/Snackbar';
import { setSnackbarStatus } from '../action/ui';

const mapStateToProps = state => state.getIn(['ui', 'snackbar']).toObject();
const mapDispatchToProps = dispatch => bindActionCreators({ setSnackbarStatus }, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class SnackBar extends React.Component {
  static propTypes = {
    setSnackbarStatus: React.PropTypes.func.isRequired,
    show: React.PropTypes.bool.isRequired,
    message: React.PropTypes.string,
    timeout: React.PropTypes.number,
  };
  static defaultProps = {
    message: '',
    timeout: 400,
  };
  @autobind
  handleRequestClose() {
    this.props.setSnackbarStatus(false);
  }

  render() {
    return (
      <Snackbar
        open={this.props.show}
        message={this.props.message}
        autoHideDuration={this.props.timeout}
        onRequestClose={this.handleRequestClose}
      />
    );
  }
}
