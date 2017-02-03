import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';

export default muiThemeable()(class extends React.Component {
  static propTypes = {
    src: React.PropTypes.string.isRequired,
    preloadElement: React.PropTypes.element,
    onload: React.PropTypes.func,
    onerror: React.PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      url: '',
      loading: false,
    };
    let delay = 0.5;
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
      if (this.xhr.status !== 200) {
        // reload
        delay *= 2;
        setTimeout(() => this.xhr.send(), delay);
        return;
      }
      const blob = this.xhr.response;
      this.setState({ url: window.URL.createObjectURL(blob) });
    });
    this.xhr.addEventListener('error', (e) => {
      console.error(e);
    });
    this.xhr.responseType = 'blob';
    this.xhr.open('GET', props.src);
    if (props.load) this.xhr.send();
  }
  componentWillReceiveProps(newProps) {
    if (newProps.src !== this.props.src) {
      this.xhr.abort();
      this.xhr.open('GET', newProps.src);
    }
    if (newProps.load && this.state.loading === false) {
      this.setState({ loading: true });
      this.xhr.send();
    }
  }
  render() {
    const { muiTheme, ...other } = this.props;
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
    const preloadElement = (
      <div className="image__preload" style={preloadStyle}>
        <div className="image__wrapper" style={wrapperStyle}>
          <div className="image__progress" style={progressStyle}>
            {this.state.progress}%
          </div>
          <svg style={svgStyle.viewbox} xmlns="http://www.w3.org/2000/svg" version="1.1">
            <line style={svgStyle.line} x1="20%" y1="0" x2="80%" y2="0" />
          </svg>
        </div>
      </div>);
    const imageElement = <img src={this.state.url} className="image__img" />;

    const args = {};
    Object.keys(other).forEach((key) => {
      if (key !== 'src' && key !== 'load')args[key] = other[key];
    });
    return (
      <div className="image" {...args}>
        {this.state.url ? imageElement : preloadElement}
      </div>
    );
  }
});
