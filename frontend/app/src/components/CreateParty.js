import React, {Component} from 'react';

import {Link} from 'react-router-dom';
import axios from 'axios';


export default class CreateParty extends Component {
  constructor() {
    super();
  }
  
  render() {
    return (
      <div className="content">
        <form>
          <label>Wie ist dein Name?</label>
          <input type="text" placeholder="Max Mustermann"/>
        </form>
        <nav className="bar bar-tab">
          <Link to="/" className="tab-item danger">Zurück</Link>
          <Link to="/lobby" className="tab-item primary" onClick={this.postPartyAndMemeber}>Erstellen</Link>
        </nav>
      </div>
    );
  }
  
  postPartyAndMemeber() {
    //Erstelle Party
    axios.post(
      'http://localhost:8000/api/parties/',
      {}
    ).then(
      function (party) {
        console.log(party);
        //Erstelle Spieler
        axios.post(
          'http://localhost:8000/api/party-members/', {
            name: 'test',
            party: party.data.id
          }
        ).then(
          function (party_member) {
            console.log(party_member);
          }
        ).catch(
          function (error) {
            console.log(error);
          }
        );
      }
    ).catch(
      function (error) {
        console.log(error);
      }
    );
  }
}