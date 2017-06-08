import React, {Component} from 'react';

import {Link} from 'react-router-dom';
import axios from 'axios';
import Error from "./Error";


export default class CreateParty extends Component {

  constructor() {
    super();
    this.state = {name: '', tipped: false, is_error: false};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.postPartyAndMember = this.postPartyAndMember.bind(this);
  }

  render() {

    const error = (
      <Error>
        <div>
          <p>Es ist ein Fehler aufgetreten!</p>
        </div>
        <div>
          <button
            className="primary"
            onClick={
              () => {
                this.setState({is_error: false});
              }
            }
          >
            OK
          </button>
        </div>
      </Error>
    );

    return (
      <div className="content">
        {
          this.state.name === '' && this.state.tipped ?
            (error) :
            (<span></span>)
        }
        <form>
          <label>Wie ist dein Name?</label>
          <input type="text" placeholder="Max Mustermann" value={this.state.name} onChange={this.handleChange}/>

        </form>
        <nav className="bar bar-tab">
          <Link to="/" className="tab-item danger">Zurück</Link>
          <a className="tab-item primary" onClick={this.postPartyAndMember}>Erstellen</a>
        </nav>
      </div>
    );
  }

  handleChange(event) {
    this.setState({name: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  postPartyAndMember(event) {
    this.setState({tipped: true});
    this.setState({is_error: true});
    if (this.state.name !== '') {
      event.preventDefault();
      console.log(event);
      //Erstelle Party
      axios.post(
        'http://localhost:8000/api/parties/',
        {}
      ).then(
        (party) => {
          console.log(party);
          //Erstelle Spieler
          axios.post(
            'http://localhost:8000/api/party-members/', {
              name: this.state.name,
              party: party.data.id
            }
          ).then(
            (party_member) => {
              console.log(party_member);
              this.props.history.push('/lobby');
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
}