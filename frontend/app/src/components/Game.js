import React from 'react';

import ReactHowler from 'react-howler';

import bomb from '../assets/bomb.png';
import bomb_burning_sound from '../assets/bomb_burning.mp3';

const WAITING = 'waiting';
const PREPARE = 'prepare';
const PLAYING = 'playing';

export default class Game extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      status: WAITING,
      soundPosition: 0
    };
    
    this.renderSound = this.renderSound.bind(this);
  }
  
  handlePlaying(event) {
    if (event.position + 100 >= event.duration) {
      this.setState({soundPosition: 0});
    }
  }
  
  renderSound() {
    switch (this.state.status) {
      case WAITING:
        return (
          <ReactHowler
            src={bomb_burning_sound}
            playing={true}
            loop={true}
          />
        );
    }
  }
  
  render() {
    return (
      <div className="content">
        <img src={bomb}/>
        {this.renderSound()}
      </div>
    );
  }
}