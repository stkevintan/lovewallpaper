import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadList } from '../action/loader';

import ImageGrids from '../component/ImageGrids';

const mapStateToProps = state => ({
  category: state.getIn(['metadata', 'category']),
});
const mapDispatchToProps = dispatch => bindActionCreators({ loadList }, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class extends React.Component {
  static propTypes = {
    loadList: React.PropTypes.func.isRequired,
    category: React.PropTypes.object.isRequired,
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
    props.loadList(props.category.getIn([id, 'url']), ['category', id]);
  }
  render() {
    return (<ImageGrids tiles={this.props.category.get(this.props.params.id).toJS().data || []} />);
  }
}
