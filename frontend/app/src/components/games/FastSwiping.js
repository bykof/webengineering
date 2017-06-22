import React from 'react';
import GameComponent from "./GameComponent";

export default class FastSwiping extends GameComponent {
  
  // Wird aufgerufen, wenn eine Nachricht über this.socket.send versendet wurde
  onDefaultMessage(data) {
    console.log(data);
  }
  
  // Wird aufgerufen wenn das Spiel vorbei ist (nach 15 Sekunden)
  onGameFinished() {
  }
  
  // Wird aufgerufen wenn das Spiel startet
  onGameStart() {
  }
  
  // Wird aufgerufen bei jeder Sekunde (15 Mal)
  onTick() {
  }
  
  onClick() {
    this.socket.send(
      {hello: 'world'}
    );
  }
  
  render() {
    return (
      <div>
        <h1>FastSwiping</h1>
        <button onClick={this.onClick.bind(this)}>Swipe</button>
      </div>
    );
  }
}