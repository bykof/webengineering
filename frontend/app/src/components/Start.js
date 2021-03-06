import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import logo from '../assets/logo.png';
import '../styles/Start.css';
import axios from 'axios';

export default class Start extends Component {
  
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    return (
      <div className="content">
        <Link to={'/gametesting/'}>Debug Games</Link>
        <h1>Drink Olympics</h1>
        <img src={logo} />
        <nav className="bar bar-tab">
          <Link to="/create-party" className="tab-item primary">Spiel erstellen</Link>
          <Link to="/join-party" className="tab-item second-primary">Spiel beitreten</Link>
        </nav>
      </div>
    );
  }
  
  
  getParty() {
    axios.get('http://localhost:8000/api/parties/')
      .then(function (response) {
        console.log(response);
        
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  getPlayers() {
    axios.get('http://localhost:8000/api/party-members/')
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  delete() {
    axios.delete('http://localhost:8000/api/party-members/')
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

