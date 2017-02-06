import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { omit } from 'lodash';
import muiThemeable from 'material-ui/styles/muiThemeable';

class Image extends React.Component {
  static propTypes = {
    src: React.PropTypes.string.isRequired,
    muiTheme: React.PropTypes.shape({
      palette: React.PropTypes.shape({
        primary1Color: React.PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      url: '',
      loading: false,
    };
    this.aborted = false;
    this.delay = 1;
    this.xhr = new XMLHttpRequest();
    this.xhr.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        const progress = (e.loaded * 100 / e.total).toFixed(0);
        if (progress !== this.state.progress) { // Debounce
          this.setState({ progress });
        }
      }
    });
    this.xhr.addEventListener('load', () => {
      if (this.xhr.status !== 200) this.handleAjaxError();
      else {
        const blob = this.xhr.response;
        this.setState({ url: window.URL.createObjectURL(blob) });
      }
    });
    this.xhr.addEventListener('error', (e) => {
      console.error(e);
      this.handleAjaxError();
    });
    this.xhr.responseType = 'blob';
    this.xhr.open('GET', props.src);
    this.xhr.send();
  }

  componentWillUnmount() {
    if (this.progress !== '100') {
      this.aborted = true;
      this.xhr.abort();
    }
  }

  handleAjaxError() {
    // try 5 times
    if (this.aborted || this.xhr.readyState === 0 || this.delay >= 5) return;
    console.log(`Try to reload after ${this.delay}s`);
    setTimeout(() => this.xhr.send(), this.delay);
    this.delay++;
  }

  render() {
    const { muiTheme, ...others } = this.props;

    const preloadStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#fff',
      backgroundColor: muiTheme.palette.primary1Color,
      fontSize: '2rem',
    };
    const progressStyle = {
      fontSize: '2rem',
      lineHeight: '48px',
      textAlign: 'center',
    };
    const wrapperStyle = {
      marginTop: '-48px',
      width: '100%',
    };
    const svgStyle = {
      viewbox: {
        width: '100%',
        height: '3px',
        display: 'block',
        marginTop: '10px',
      },
      line: {
        fill: '#fff',
        stroke: '#fff',
        strokeWidth: '3px',
        strokeDasharray: `${this.state.progress}% ${100 - this.state.progress}%`,
        transition: 'all 0.2s linear',
      },
    };
    // image and preload element must get a key to enable animate.
    const preloadElement = (
      <div key="preload" className="image__preload" style={preloadStyle}>
        <div className="image__wrapper" style={wrapperStyle}>
          <div className="image__progress" style={progressStyle}>
            {this.state.progress}%
          </div>
          <svg style={svgStyle.viewbox} xmlns="http://www.w3.org/2000/svg" version="1.1">
            <line style={svgStyle.line} x1="20%" y1="0" x2="80%" y2="0" />
          </svg>
        </div>
      </div>
    );
    const imageElement = (
      <ReactCSSTransitionGroup transitionName="fade" transitionAppear transitionAppearTimeout={300} transitionEnterTimeout={500} transitionLeaveTimeout={0}>
        <img key="image" src={this.state.url} className="image__img" alt="wallpaper preview" />
      </ReactCSSTransitionGroup>
    );
    return (
      <div className="image" {...omit(others, ['src'])}>
        {preloadElement}
        {this.state.url ? imageElement : null }
      </div>
    );
  }
}


export default muiThemeable()(Image);
