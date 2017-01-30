import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadList } from '../action/loader';

import ImageGrids from '../component/ImageGrids';

const mapStateToProps = state => ({
  wallpaper: state.getIn(['metadata', 'wallpaper']).toJS(),
});
const mapDispatchToProps = dispatch => bindActionCreators({ loadList }, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class extends React.Component {
  static propTypes = {
    loadList: React.PropTypes.func.isRequired,
    wallpaper: React.PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    props.loadList(props.wallpaper.url, ['wallpaper']);
  }
  render() {
    return (<ImageGrids tiles={this.props.wallpaper.data || []} />);
  }
}
