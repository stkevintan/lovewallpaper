import React from 'react';
import { connect } from 'react-redux';

import ImageGrids from '../component/ImageGrids';

const mapStateToProps = state => ({
  recommend: state.metadata.recommend,
});

@connect(mapStateToProps)
export default class extends React.Component {
  constructor(props) {
    super(props);
    if (typeof recommend === 'string') {

    }
  }
  render() {
    return (
      <ImageGrids />
    );
  }

}
