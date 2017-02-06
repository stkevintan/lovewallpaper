import React from 'react';
import autobind from 'autobind-decorator';
import { ipcRenderer } from 'electron';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadList, loadMore } from '../action/loader';
import { setSnackbarStatus, setModalStatus } from '../action/ui';
import ImageGrids from '../component/ImageGrids';

const mapStateToProps = state => ({
  wallpaper: state.getIn(['metadata', 'wallpaper']).toJS(),
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
    wallpaper: React.PropTypes.shape({
      url: React.PropTypes.string.isRequired,
      data: React.PropTypes.array,
    }).isRequired,
    loadMore: React.PropTypes.func.isRequired,
    setSnackbarStatus: React.PropTypes.func.isRequired,
    setModalStatus: React.PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    props.loadList(props.wallpaper.url, ['wallpaper']);
  }
  @autobind
  handleMore() {
    const wp = this.props.wallpaper;
    if (wp.link && wp.link.next) {
      this.props.setSnackbarStatus(true, 'Loading More Wallpapers...', 0);
      this.props.loadMore(wp.link.next, ['wallpaper']);
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
      tiles={this.props.wallpaper.data}
      handleMore={this.handleMore}
      handleDownload={this.handleDownload}
      handleSet={this.handleSet}
    />);
  }
}
