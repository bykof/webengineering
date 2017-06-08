import React, {Component} from 'react';
import axios from 'axios';

import {Link} from 'react-router-dom';

import '../styles/JoinParty.css';
import LoadingSpinner from "./LoadingSpinner";
import Error from "./Error";
import OverlayMessage from "./OverlayMessage";


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
    
  }
  
  updateInputState(event) {
    this.state[event.target.name] = event.target.value;
    this.setState(this.state);
  }
  
  joinParty(event) {
    this.setState({is_loading: true});
    axios.get(
      'http://localhost:8000/api/parties/',
      {
        params: {
          entry_code: this.state.entry_code
        },
      },
    ).then(
      (response) => {
        if (response.data.length === 1) {
          let party = response.data[0];
          console.log(party);
        } else {
          this.setState({overlay_message: 'Die Gruppe wurde leider nicht gefunden :('});
          this.setState({is_loading: false});
        }
      }
    ).catch(
      (error) => {
        console.log(error);
        this.setState({is_loading: false});
      }
    );
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