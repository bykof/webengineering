import React, {Component} from 'react';
import axios from 'axios';

import {Link} from 'react-router-dom';

import '../styles/JoinParty.css';
import LoadingSpinner from "./LoadingSpinner";
import Error from "./Error";
import OverlayMessage from "./OverlayMessage";
import {API_HOST} from "../config";


export default class JoinParty extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      entry_code: '',
      name: '',
      is_loading: false,
      is_error: false,
      overlay_message: ''
    };
    
    this.updateInputState = this.updateInputState.bind(this);
    this.showError = this.showError.bind(this);
    this.createMember = this.createMember.bind(this);
  }
  
  updateInputState(event) {
    this.state[event.target.name] = event.target.value;
    this.setState(this.state);
  }
  
  showError(error) {
    console.log(error);
    console.log(error.response);
    this.setState({is_loading: false});
    this.setState({is_error: true});
  }
  
  createMember() {
    axios.post(
      API_HOST + '/api/party-members/',
      {
        name: this.state.name,
        party: this.props.application_store.current_party.id
      }
    ).then(
      (response) => {
        this.props.application_store.current_member = response.data;
        this.props.history.push('/lobby');
      }
    ).catch(this.showError);
  }
  
  joinParty(event) {
    this.setState({is_loading: true});
    axios.get(
      API_HOST + '/api/parties/',
      {
        params: {
          entry_code: this.state.entry_code
        },
      },
    ).then(
      (response) => {
        if (response.data.length === 1) {
          this.props.application_store.current_party = response.data[0];
          this.createMember();
        } else {
          this.setState({overlay_message: 'Die Gruppe wurde leider nicht gefunden :('});
          this.setState({is_loading: false});
        }
      }
    ).catch(this.showError);
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
    
    const overlay_message = (
      <OverlayMessage>
        <div>
          <p>{this.state.overlay_message}</p>
        </div>
        <div>
          <button
            className="primary"
            onClick={
              () => {
                this.setState({overlay_message: ''});
              }
            }
          >
            OK
          </button>
        </div>
      </OverlayMessage>
    );
    
    return (
      <div className="content">
        {
          this.state.is_loading ?
            <LoadingSpinner /> :
            null
        }
        {
          this.state.is_error ?
            error :
            null
        }
        {
          this.state.overlay_message !== '' ?
            overlay_message :
            null
        }
        <form>
          <label>Name</label>
          <input type="text" name="name" placeholder="Max Mustermann" onChange={this.updateInputState}/>
          <label>Gruppencode</label>
          <input type="text" name="entry_code" placeholder="123XYZ" onChange={this.updateInputState}/>
        </form>
        <nav className="bar bar-tab">
          <Link to="/" className="tab-item danger">Zurück</Link>
          <a className="tab-item primary" onClick={this.joinParty.bind(this)}>Beitreten</a>
        </nav>
      </div>
    );
  }
}