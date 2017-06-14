import '../styles/Lobby.css'
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const PARTY_MEMBER_JOINED = 'party_member_joined';
const PARTY_MEMBER_LEAVED = 'party_member_leaved';


const PARTY_PARTY_MEMBERS = (party_id) => {
  return 'http://127.0.0.1:8000/api/parties/' + party_id + '/party_members/';
};


export default class Lobby extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      members: []
    };
    
    this.socket = null;
  }
  
  initSocket() {
    this.socket = new WebSocket(
      'ws://127.0.0.1:8000/party/' +
      this.props.application_store.current_party.id +
      '/?party_member=' +
      JSON.stringify(this.props.application_store.current_member)
    );
  
    this.socket.onmessage = (event) => {
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
  
    if (this.socket.readyState === WebSocket.OPEN) this.socket.onopen();
  }
  
  onPartyMemberJoined(data) {
    console.log('party member joined: ', data);
    this.state.members.push(data.party_member);
    this.setState({members: this.state.members});
  }
  
  onPartyMemberLeaved(data) {
    console.log('party member leaved: ', data);
    this.state.members = this.state.members.filter((member) => member.id !== data.party_member.id);
    this.setState({members: this.state.members});
  }
  
  componentWillUnmount() {
    this.socket.close();
  }
  
  retrieveMembers() {
    axios.get(
      PARTY_PARTY_MEMBERS(this.props.application_store.current_party.id),
    ).then(
      (response) => {
        response.data.forEach(
          (party_member) => {
            if (this.state.members.map((member) => member.id).indexOf(party_member.id) === -1) {
              this.state.members.push(party_member);
              this.setState({members: this.state.members});
            }
          }
        )
      }
    ).catch(
      (error) => {
        console.log(error, error.response);
      }
    )
  }
  
  componentDidMount() {
    this.initSocket();
    this.retrieveMembers();
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
  
    if (!this.props.application_store.current_party) return this.props.history.push('create-party');
    
    return (
      <div className="content">
        <h1>Lobby</h1>
        <h4>Code: {this.props.application_store.current_party.entry_code}</h4>
        <h4>Liste der Spieler:</h4>
        {renderedMembers}
        <nav className="bar bar-tab">
          <Link to='/' className="tab-item danger">Abbrechen</Link>
          <Link to="/lobby" className="tab-item primary">Spiel starten</Link>
        </nav>
      </div>
    );
  }
}