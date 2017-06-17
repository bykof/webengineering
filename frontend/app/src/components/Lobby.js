import '../styles/Lobby.css'
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';


const PARTY_PARTY_MEMBERS = (party_id) => {
  return 'http://127.0.0.1:8000/api/parties/' + party_id + '/party_members/';
};


export default class Lobby extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      members: []
    };
    
    this.party_socket = null;
  }
  
  componentWillUnmount() {
    this.party_socket.clearCallbacks();
  }
  
  initPartyWebsocket() {
    this.party_socket = this.props.application_store.create_party_socket();
    this.party_socket.onPartyMemberLeaved.push(this.onPartyMemberLeaved.bind(this));
    this.party_socket.onPartyMemberJoined.push(this.onPartyMemberJoined.bind(this));
    this.party_socket.onPartyStarted.push(this.onPartyStarted.bind(this));
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
    this.initPartyWebsocket();
    this.retrieveMembers();
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
  
  onPartyStarted() {
    console.log('party has started!');
    this.props.history.push('/game');
  }
  
  startGame() {
    axios.get(
      'http://127.0.0.1:8000/api/parties/' + this.props.application_store.current_party.id + '/start/'
    ).catch(
      (error) => {
        console.log(error.response);
      }
    )
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
          <a onClick={this.startGame.bind(this)} className="tab-item primary">Spiel starten</a>
        </nav>
      </div>
    );
  }
}