import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadList } from '../action/loader';

import ImageGrids from '../component/ImageGrids';

const mapStateToProps = state => ({
  recommend: state.getIn(['metadata', 'recommend']).toJS(),
});
const mapDispatchToProps = dispatch => bindActionCreators({ loadList }, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class extends React.Component {
  static propTypes = {
    loadList: React.PropTypes.func.isRequired,
    recommend: React.PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    props.loadList(props.recommend.url, ['recommend']);
  }
  render() {
    return (<ImageGrids tiles={this.props.recommend.data || []} />);
  }
}
