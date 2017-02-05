import React from 'react';
import ReactDOM from 'react-dom';
import { omit, throttle } from 'lodash';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      load: false,
    };
  }
  componentDidMount() {
    const parentDOM = this.props.parentDOM;
    if (!parentDOM && this.state.load) return;
    const itemDOM = ReactDOM.findDOMNode(this);
    let handler = () => {
      const scrollBottom = parentDOM.scrollTop + parentDOM.clientHeight;
      if (itemDOM.offsetTop <= scrollBottom) {
        parentDOM.removeEventListener('scroll', handler);// remove the listener !
        parentDOM.removeEventListener('resize', handler);
        this.setState({ load: true });
      }
    };
    handler();
    handler = throttle(handler, 300);
    parentDOM.addEventListener('scroll', handler);
    parentDOM.addEventListener('resize', handler);
  }
  placeholderElement = <div />;
  render() {
    const passDownArgs = omit(this.props, ['parentDOM']);
    return (
      <div {...passDownArgs}>
        {this.state.load ? this.props.children : this.placeholderElement }
      </div>
    );
  }
}
