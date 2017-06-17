import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Import Ratchet for beautiful design
import "ratchet-npm/dist/css/ratchet.min.css";

import './styles/index.css';

import FastClick from 'fastclick';
import ApplicationStore from "./stores/ApplicationStore";

document.addEventListener(
  'deviceready',
  () => {
    ReactDOM.render(
      <App application_store={new ApplicationStore()} />,
      document.getElementById('root')
    );
  },
  false
);
