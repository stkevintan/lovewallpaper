import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { omit, throttle } from 'lodash';

export default class Lazyload extends React.Component {
  static propTypes = {
    parentDOM: React.PropTypes.instanceOf(HTMLElement),
    children: React.PropTypes.element.isRequired,
  };
  static defaultProps = {
    parentDOM: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      load: false,
    };
  }
  // the componentDidMount event must be triggered after its parent's.
  componentDidMount() {
    if (this.state.load) return;
    const itemDOM = ReactDOM.findDOMNode(this);
    const parentDOM = this.props.parentDOM || itemDOM.parentElement;
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
    window.addEventListener('resize', handler);
  }
  placeholderElement = <div />
  render() {
    const passDownArgs = omit(this.props, ['parentDOM']);
    const children = (
      <ReactCSSTransitionGroup transitionName="scale" transitionAppear transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
        {this.props.children}
      </ReactCSSTransitionGroup>
    );
    return (
      <div{...passDownArgs}>
        {this.state.load ? children : this.placeholderElement }
      </div>

    );
  }
}

