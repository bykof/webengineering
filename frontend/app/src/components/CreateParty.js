import React, {Component} from 'react';

import {Link} from 'react-router-dom';


export default class CreateParty extends Component {
  render() {
    return (
      <div className="content">
        <form>
          <label>Wie ist dein Name?</label>
          <input type="text" placeholder="Max Mustermann"/>
        </form>
        <nav className="bar bar-tab">
          <Link to="/" className="tab-item danger">Zurück</Link>
          <Link to="/" className="tab-item primary">Erstellen</Link>
        </nav>
      </div>
    );
  }
}