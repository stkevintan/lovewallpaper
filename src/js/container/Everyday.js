import React from 'react';
import autobind from 'autobind-decorator';
import { ipcRenderer } from 'electron';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadList, loadMore } from '../action/loader';
import { setSnackbarStatus, setModalStatus } from '../action/ui';

import ImageGrids from '../component/ImageGrids';

const mapStateToProps = state => ({
  everyday: state.getIn(['metadata', 'everyday']),
});
const mapDispatchToProps = dispatch => bindActionCreators({
  loadList,
  loadMore,
  setSnackbarStatus,
  setModalStatus,
}, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class extends React.Component {
  static propTypes = {
    loadList: React.PropTypes.func.isRequired,
    everyday: React.PropTypes.object.isRequired,
    loadMore: React.PropTypes.func.isRequired,
    setSnackbarStatus: React.PropTypes.func.isRequired,
    setModalStatus: React.PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.load(props);
  }
  componentWillReceiveProps(props) {
    const newId = props.params.id;
    const id = this.props.params.id;
    if (id !== newId) {
      this.load(props);
    }
  }
  load(props) {
    const id = 1 * props.params.id;
    props.loadList(props.everyday.getIn([id, 'url']), ['everyday', id]);
  }
  @autobind
  handleMore() {
    const id = 1 * this.props.params.id;
    const link = this.props.everyday.getIn([id, 'link']).toObject();
    if (typeof link !== 'undefined' && link.next) {
      this.props.setSnackbarStatus(true, 'Loading More Wallpapers...', 0);
      this.props.loadMore(link.next, ['everyday', id]);
    }
  }
  @autobind
  handleDownload(url) {
    this.props.setModalStatus(true, `Downloading wallpaper from ${url}`);
    ipcRenderer.send('download-image', url);// directly send signal to main process.
  }
  @autobind
  handleSet(url) {
    this.props.setModalStatus(true, `Setting wallpaper from ${url}`);
    ipcRenderer.send('set-wallpaper', url);
  }
  render() {
    const { params, everyday } = this.props;
    return (<ImageGrids
      tiles={everyday.get(params.id).toJS().data || []}
      handleMore={this.handleMore}
      handleDownload={this.handleDownload}
      handleSet={this.handleSet}
    />);
  }
}
