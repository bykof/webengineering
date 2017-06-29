import GameComponent from "./GameComponent";
import React from 'react';


export default class PromilleCounter extends GameComponent {

  constructor(props) {
    super(props);
    this.state = {
      audioData: null
    };

    this.onAudioInput = this.onAudioInput.bind(this);
    this.initAudioInput();
  }

  initAudioInput() {
    // Listen to audioinput events
    window.addEventListener("audioinput", this.onAudioInput, false);
    // Start capturing audio from the microphone
    audioinput.start({
      // Here we've changed the bufferSize from the default to 8192 bytes.
      bufferSize: 8192
    });
  }

  onAudioInput(event) {
    console.log("Audio data received: " + event.data.length + " samples");
    this.setState({audioData: event.data});
  }

  // Wird aufgerufen, wenn eine Nachricht über this.socket.send versendet wurde
  onDefaultMessage(data) {
  }

  // Wird aufgerufen wenn das Spiel vorbei ist (nach 15 Sekunden)
  onGameFinished() {
    audioinput.stop();
    super.onGameFinished(true);
  }

  // Wird aufgerufen bei jeder Sekunde (15 Mal)
  onTick() {
  }

  render() {
    return (
      <div>
        <h1>Promille Zähler</h1>
        {this.state.audioData ? (
          this.state.audioData.map(
            (data) => {
              return <span>{data}</span>
            }
          )
        ) : null}
      </div>
    )
  }
}