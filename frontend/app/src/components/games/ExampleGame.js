import GameComponent from "./GameComponent";

export default class ExampleGame extends GameComponent {
  
  // Wird aufgerufen, wenn eine Nachricht über this.socket.send versendet wurde
  onDefaultMessage(data) {}
  
  // Wird aufgerufen wenn das Spiel vorbei ist (nach 15 Sekunden)
  onGameFinished() {
    super.onGameFinished(true);
  }
  
  // Wird aufgerufen wenn das Spiel startet
  onGameStart() {}
  
  // Wird aufgerufen bei jeder Sekunde (15 Mal)
  onTick() {}
  
  render() {}
}