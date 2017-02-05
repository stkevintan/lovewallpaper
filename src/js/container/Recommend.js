import React from 'react';
import autobind from 'autobind-decorator';
import { ipcRenderer } from 'electron';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadList, loadMore } from '../action/loader';
import { setSnackbarStatus, setModalStatus } from '../action/ui';
import ImageGrids from '../component/ImageGrids';

const mapStateToProps = state => ({
  recommend: state.getIn(['metadata', 'recommend']).toJS(),
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
    recommend: React.PropTypes.object.isRequired,
    loadMore: React.PropTypes.func.isRequired,
    setSnackbarStatus: React.PropTypes.func.isRequired,
    setModalStatus: React.PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    props.loadList(props.recommend.url, ['recommend']);
  }
  @autobind
  handleMore() {
    const wp = this.props.recommend;
    if (wp.link && wp.link.next) {
      this.props.setSnackbarStatus(true, 'Loading More Wallpapers...', 0);
      this.props.loadMore(wp.link.next, ['recommend']);
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
    return (<ImageGrids
      tiles={this.props.recommend.data || []}
      handleMore={this.handleMore}
      handleDownload={this.handleDownload}
      handleSet={this.handleSet}
    />);
  }
}
