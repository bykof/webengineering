import React from 'react';

import ReactHowler from 'react-howler';

import '../styles/Game.css';

import bomb from '../assets/bomb.png';
import bomb_burning_sound from '../assets/bomb_burning.mp3';
import bomb_ticking_sound from '../assets/bomb_ticking.mp3';
import bomb_exploding_sound from '../assets/bomb_exploding.mp3';


const WAITING = 'waiting';
const PREPARE = 'prepare';
const BOOM = 'boom';

const DRINK = 'drink';
const BOMB = 'bomb';
const PLAYING = 'playing';

import games from './games';


export default class Game extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      sound_status: WAITING,
      content_status: BOMB,
      soundPosition: 0,
      current_game: null,
    };
    
    this.renderAnimation = this.renderAnimation.bind(this);
    this.renderSound = this.renderSound.bind(this);
    this.party_socket = null;
  }
  
  componentDidMount() {
    this.party_socket = this.props.application_store.party_socket;
    this.party_socket.onGameStarts.push(this.onGameStarts.bind(this));
    this.party_socket.onPartyStopped.push(this.onPartyStopped.bind(this));
  }
  
  onPartyStopped() {
    this.props.history.push('/');
  }
  
  onGameStarts(data) {
    console.log(data);
    data.teams.forEach(
      (team) => {
        team.forEach(
          (party_member) => {
            if (party_member.id === this.props.application_store.current_member.id) {
              this.props.application_store.current_teams = data.teams;
              this.setState(
                {
                  sound_status: PREPARE,
                  current_game: games[data.game_index],
                }
              );
            }
          }
        )
      }
    );
  }
  
  renderSound() {
    switch (this.state.sound_status) {
      case WAITING:
        return (
          <ReactHowler
            src={bomb_burning_sound}
            playing={true}
            loop={true}
          />
        );
      case PREPARE:
        return (
          <ReactHowler
            src={bomb_ticking_sound}
            playing={true}
            onEnd={
              () => this.setState({sound_status: BOOM})
            }
          />
        );
      case BOOM:
        return (
          <ReactHowler
            src={bomb_exploding_sound}
            playing={true}
            onPlay={
              () => this.setState({content_status: PLAYING})
            }
          />
        );
    }
  }
  
  renderAnimation() {
    if (this.state.sound_status === PREPARE) {
      return <div className="flash" />
    }
  }
  
  renderContent() {
    switch(this.state.content_status) {
      case PLAYING:
        return React.createElement(
          this.state.current_game,
          {
            application_store: this.props.application_store,
            teams: this.state.teams,
            onGameFinished: this.onGameFinished.bind(this)
          }
        );
      case DRINK:
        setTimeout(
          () => {
            this.setState({sound_status: WAITING, content_status: BOMB});
          },
          2000
        );
        return <div className="drink">DRINK!!!</div>;
      case BOMB:
        return <img src={bomb}/>
    }
  }
  
  onGameFinished(win_or_loose) {
    console.log(win_or_loose);
    
    this.setState({content_status: DRINK});
  }
  
  render() {
    
    // Falls nichts gesetzt ist, fall zurück in create-party
    if (!this.props.application_store.current_party) return this.props.history.push('create-party');
    
    return (
      <div className='content'>
        {this.renderAnimation()}
        {this.renderContent()}
        {this.renderSound()}
      </div>
    );
  }
}