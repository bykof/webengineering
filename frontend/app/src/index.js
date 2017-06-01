import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Import Ratchet for beautiful design
import "ratchet-npm/dist/css/ratchet.min.css";

import './styles/index.css';

import FastClick from 'fastclick';

document.addEventListener(
  'deviceready',
  () => {
    FastClick.attach(document.body);
    ReactDOM.render(
      <App />,
      document.getElementById('root')
    );
  },
  false
);
