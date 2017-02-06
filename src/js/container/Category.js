import React from 'react';
import Immutable from 'immutable';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ipcRenderer } from 'electron';

import { loadList, loadMore } from '../action/loader';
import { setSnackbarStatus, setModalStatus } from '../action/ui';

import ImageGrids from '../component/ImageGrids';


const mapStateToProps = state => ({
  category: state.getIn(['metadata', 'category']),
});
const mapDispatchToProps = dispatch => bindActionCreators({
  loadList,
  loadMore,
  setSnackbarStatus,
  setModalStatus,
}, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class Category extends React.Component {
  static propTypes = {
    params: React.PropTypes.shape({ id: React.PropTypes.string.isRequired }).isRequired,
    loadList: React.PropTypes.func.isRequired,
    category: React.PropTypes.instanceOf(Immutable.List).isRequired,
    loadMore: React.PropTypes.func.isRequired,
    setSnackbarStatus: React.PropTypes.func.isRequired,
    setModalStatus: React.PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.loadList = this.props.loadList;
    this.load(props);
  }
  componentWillReceiveProps(props) {
    const newId = props.params.id;
    const id = this.props.params.id;
    if (id !== newId) {
      this.load(props);
    }
  }

  @autobind
  load(props) {
    const id = 1 * props.params.id;
    this.loadList(props.category.getIn([id, 'url']), ['category', id]);
  }
  @autobind
  handleMore() {
    const id = 1 * this.props.params.id;
    const link = this.props.category.getIn([id, 'link']).toObject();
    if (typeof link !== 'undefined' && link.next) {
      this.props.setSnackbarStatus(true, 'Loading More Wallpapers...', 0);
      this.props.loadMore(link.next, ['category', id]);
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
    const { params, category } = this.props;
    return (<ImageGrids
      tiles={category.get(params.id).toJS().data}
      handleMore={this.handleMore}
      handleDownload={this.handleDownload}
      handleSet={this.handleSet}
    />);
  }
}
