import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadList } from '../action/loader';

import ImageGrids from '../component/ImageGrids';

const mapStateToProps = state => ({
  everyday: state.getIn(['metadata', 'everyday']),
});
const mapDispatchToProps = dispatch => bindActionCreators({ loadList }, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class extends React.Component {
  static propTypes = {
    loadList: React.PropTypes.func.isRequired,
    everyday: React.PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.load(props);
  }
  componentWillReceiveProps(props) {
    const newId = props.params.id;
    const id = this.props.params.id;
    console.log(newId, id);
    if (id !== newId) {
      this.load(props);
    }
  }
  load(props) {
    const id = 1 * props.params.id;
    props.loadList(props.everyday.getIn([id, 'url']), ['everyday', id]);
  }
  render() {
    const { params, everyday } = this.props;
    return (<ImageGrids tiles={everyday.get(params.id).toJS().data || []} />);
  }
}
