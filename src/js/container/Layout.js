import React from 'react';

import Appbar from '../component/Appbar';
import Sidebar from '../component/Sidebar';

export default class extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <Appbar />
        <Sidebar />
        {this.props.children}
      </div>
    );
  }
}
