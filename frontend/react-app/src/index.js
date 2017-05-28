import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';


document.addEventListener(
  'deviceready',
  () => {
    ReactDOM.render(
      <App />,
      document.getElementById('root')
    );
  },
  false
);
