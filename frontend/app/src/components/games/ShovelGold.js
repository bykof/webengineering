import React from 'react';
import GameComponent from "./GameComponent";

import shovel_gold_gif from '../../assets/shovel_gold.gif';


export default class ShovelGold extends GameComponent {
  
  static description = 'Führe so schnell es geht eine Schaufelbewegung aus!!!';
  
  constructor(props) {
    super(props);
    
    this.state = {
      count_ups: 0,
      is_up: true,
      scores: {}
    };
    
    this.onAccelerationError = this.onAccelerationError.bind(this);
    this.onAcceleration = this.onAcceleration.bind(this);
    
    navigator.accelerometer.watchAcceleration(this.onAcceleration, this.onAccelerationError, {frequency: 40});
  }
  
  onAcceleration(acceleration) {
    let temp_count_ups = this.state.count_ups;
    let is_up = this.state.is_up;
    
    if (acceleration.y >= 0) {
      if (!is_up) {
        temp_count_ups++;
      }
      is_up = true;
    } else {
      is_up = false;
    }
    
    
    this.setState(
      {
        count_ups: temp_count_ups,
        is_up: is_up
      }
    );
  }
  
  onAccelerationError() {
    alert('onError!');
  }
  
  // Wird aufgerufen, wenn eine Nachricht über this.socket.send versendet wurde
  onDefaultMessage(data) {
    this.state.scores[data.party_member.id] = data;
    this.setState({scores: this.state.scores});
  }
  
  // Wird aufgerufen wenn das Spiel vorbei ist (nach 15 Sekunden)
  onGameFinished() {
    let my_team_points = 0;
    let other_team_points = 0;
    this.props.teams.forEach(
      (team) => {
        team.forEach(
          (party_member) => {
            
            // Gucke ob das mein Team ist oder ein anderes Team
            if (team.find((party_member) => party_member.id === this.props.application_store.current_member.id)) {
              my_team_points += this.state.scores[party_member.id].points;
            } else {
              other_team_points += this.state.scores[party_member.id].points;
            }
          }
        )
      }
    );
    
    // Ruf auf, wenn ich weiß, dass das Team gewonnen hat
    super.onGameFinished(my_team_points > other_team_points);
  }
  
  // Wird aufgerufen bei jeder Sekunde (15 Mal)
  onTick() {
    super.onTick();
    this.socket.send(
      {
        points: this.state.count_ups,
        party_member: this.props.application_store.current_member,
      }
    );
  }
  
  render() {
    console.log(this.state);
    return (
      <div>
        <img src={shovel_gold_gif} />
        <h1>Geschaufelt: {this.state.count_ups}</h1>
        
      </div>
    );
  }
}