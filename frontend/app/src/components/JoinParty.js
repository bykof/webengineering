import React, {Component} from 'react';

import {Link} from 'react-router-dom';

import '../styles/JoinParty.css';


export default class JoinParty extends Component {
  render() {
    return (
      <div className="content">
        <form>
          <label>Name</label>
          <input type="text" placeholder="Max Mustermann"/>
          <label>Gruppencode</label>
          <input type="text" placeholder="123XYZ"/>
        </form>
        <nav className="bar bar-tab">
          <Link to="/" className="tab-item danger">Zurück</Link>
          <Link to="/" className="tab-item primary">Beitreten</Link>
        </nav>
      </div>
    );
  }
}