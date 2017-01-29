import React from 'react';
import { indigo500 } from 'material-ui/styles/colors';

export default () => (
  <div className="wrapper-loading" style={{ backgroundColor: indigo500 }}>
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
);
