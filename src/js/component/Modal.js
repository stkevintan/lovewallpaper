import React from 'react';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import { setModalStatus } from '../action/ui';

const mapStateToProps = state => state.getIn(['ui', 'modal']).toObject();
const mapDispatchToProps = dispatch => bindActionCreators({ setModalStatus }, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class Modal extends React.Component {
  static propTypes = {
    setModalStatus: React.PropTypes.func.isRequired,
    show: React.PropTypes.bool.isRequired,
    message: React.PropTypes.string.isRequired,
  };
  @autobind
  handleClose() {
    this.props.setModalStatus(false);
  }
  render() {
    const actions = [
      <FlatButton
        label="Hide"
        primary
        onTouchTap={this.handleClose}
      />,
    ];
    return (
      <Dialog
        title="Processing"
        actions={actions}
        modal
        open={this.props.show}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <CircularProgress />
          <span style={{ flex: 1, marginLeft: '20px' }}>{this.props.message}</span>
        </div>
      </Dialog>
    );
  }
}

