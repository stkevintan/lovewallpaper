import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';

import Controls from '../component/Controls';

export default muiThemeable()(({ muiTheme }) => (
  <div className="splash" style={{ backgroundColor: muiTheme.palette.primary1Color }}>
    <div className="splash__controls"><Controls /></div>
    <div className="image-loader">
      <div className="rect">
        <div className="dot d_i" />
        <div className="dot d_ii" />
      </div>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 15 -5" result="goo" />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </defs>
    </svg>
  </div>
));
