import '../styles/Lobby.css'
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const PARTY_MEMBER_JOINED = 'party_member_joined';
const PARTY_MEMBER_LEAVED = 'party_member_leaved';


export default class Lobby extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      members: []
    };
    
    if (!this.props.application_store.current_party) return this.props.history.push('create-party');
  }
  
  onPartyMemberJoined(data) {
    this.state.members.push(data.party_member);
    this.setState({members: this.state.members});
  }
  
  onPartyMemberLeaved(data) {
    this.state.members = this.state.members.filter(
      (member) => member.id === data.party_member.id
    );
    this.setState({members: this.state.members});
  }
  
  componentDidMount() {
    const socket = new WebSocket(
      'ws://127.0.0.1:8000/party/' +
      this.props.application_store.current_party.id +
      '/?party_member=' +
      JSON.stringify(this.props.application_store.current_member)
    );
    
    socket.onmessage = (event) => {
      let data = JSON.parse(event.data);
      switch (data.action) {
        case PARTY_MEMBER_JOINED:
          this.onPartyMemberJoined(data);
          break;
        case PARTY_MEMBER_LEAVED:
          this.onPartyMemberLeaved(data);
          break;
        default:
          console.log(data);
      }
    };
    
    if (socket.readyState === WebSocket.OPEN) socket.onopen();
  }
  
  render() {
    
    const renderedMembers = this.state.members.map(
      (member) => {
        return (
          <p key={member.id}>
            - {member.name}
          </p>
        );
      }
    );
    
    return (
      <div className="content">
        <h1>Lobby</h1>
        <h4>Code: {this.props.application_store.current_party.entry_code}</h4>
        <h4>Liste der Spieler:</h4>
        {renderedMembers}
        <nav className="bar bar-tab">
          <Link to="/" className="tab-item danger">Zurück</Link>
          <Link to="/lobby" className="tab-item primary">Spiel starten</Link>
        </nav>
      </div>
    );
  }
}