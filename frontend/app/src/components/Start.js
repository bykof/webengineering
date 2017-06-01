import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import logo from '../assets/logo.png';
import '../styles/Start.css';

export default class Start extends Component {
  render() {
    return (
      <div className="content">
        <h1>Drink Olympics</h1>
        <nav className="bar bar-tab">
          <Link to="/create-party" className="tab-item primary">Spiel erstellen</Link>
          <Link to="/join-party" className="tab-item second-primary">Spiel beitreten</Link>
        </nav>
      </div>
    );
  }
}

