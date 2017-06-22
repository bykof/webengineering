import React from 'react';

import '../styles/Game.css';

import games from './games';


export default class GameTesting extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      teams: [
        ['123', 'w453'],
        ['234', '2342']
      ]
    };
    
    this.party_socket = null;
  }
  
  componentWillMount() {
    this.props.application_store.current_party = {
      id: 123,
    };
    this.props.application_store.current_member = {
      id: 123,
      name: 'bla'
    };
    this.props.application_store.create_party_socket();
    this.party_socket = this.props.application_store.party_socket;
  }
  
  onGameFinished() {
  
  }
  
  renderContent() {
    
    if (!(this.props.match.params.game_id in games)) return 'Spiel nicht gefunden!';
    
    return React.createElement(
      games[this.props.match.params.game_id],
      {
        application_store: this.props.application_store,
        teams: this.state.teams,
        onGameFinished: this.onGameFinished.bind(this)
      }
    );
  }
  
  render() {
    
    return (
      <div className='content'>
        {this.renderContent()}
      </div>
    );
  }
}