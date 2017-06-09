import '../styles/Lobby.css'
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Lobby extends Component {

  constructor(props) {
    super(props);
    this.state = {
      members : [this.props.application_store.current_member.name]
    }
  }

  render() {
    return (
      <div className="content">
        <h1>Lobby</h1>
        <h4>Code</h4>
        <span>{this.props.application_store.current_party.entry_code}</span>
        <form>
          <h4>Liste der Spieler</h4>
          <h4>Host</h4>
          <span>{this.state.members[0]}</span>
          <h4>Mitspieler</h4>
          <span>Noch in arbeit...</span>
        </form>
        <nav className="bar bar-tab">
          <Link to="/" className="tab-item danger">Zurück</Link>
          <Link to="/lobby" className="tab-item primary">Spiel starten</Link>
        </nav>
      </div>
    );
  }
}