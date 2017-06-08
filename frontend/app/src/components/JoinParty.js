import React, {Component} from 'react';
import axios from 'axios';

import {Link} from 'react-router-dom';

import '../styles/JoinParty.css';


export default class JoinParty extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      entry_code: '',
      name: '',
      is_loading: false,
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
          
        } else {
          
        }
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }
  
  render() {
    return (
      <div className="content">
        {
          this.state.is_loading ?
            <div>
              <div className="overlay"/>
            </div> :
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