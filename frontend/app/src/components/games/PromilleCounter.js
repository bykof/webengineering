import GameComponent from "./GameComponent";
import React from 'react';


export default class PromilleCounter extends GameComponent {

  static description = 'Blase so lang und fest ins Mikrofon wie möglich!';

  constructor(props) {
    super(props);
    this.state = {
      audioData: null,
      maxValue: [],
      members: []
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
    this.setState({audioData: event.data});

    let max = 0;
    // Höchster Wert in audioData
    for (let i = 0; i < this.state.audioData.length; i++) {
      if (max < this.state.audioData[i]) {
        max = this.state.audioData[i];
      }
    }
    //Math.min.apply(Math, this.state.audioData);
    this.state.maxValue.push(max);
    console.log("Max: " + max);

    this.socket.send(
      {
        party_member: this.props.application_store.current_member,
        maxList: this.state.maxValue
      });
  }

  // Wird aufgerufen, wenn eine Nachricht über this.socket.send versendet wurde
  onDefaultMessage(data) {
    this.state.members[data.party_member.name] = data.maxList;
  }

  // Wird aufgerufen wenn das Spiel vorbei ist (nach 15 Sekunden)
  onGameFinished() {
    audioinput.stop();
    let sum = 0;
    let endValue;
    let winner = ["default", 0];

    for (let member in this.state.members) {
      for (let i = 0; i < this.state.members[member].length; i++) {
        sum += this.state.maxValue[i];
      }
      endValue = sum / this.state.maxValue.length;
      if (endValue > winner[1]) {
        winner = [member, endValue]
      }
    }
    console.log(winner);

    if (winner[0] === this.props.application_store.current_member.name) {
      super.onGameFinished(true);
      console.log("Gewinner");
    } else {
      super.onGameFinished(false);
      console.log("Verlierer");
    }

  }

  // Wird aufgerufen bei jeder Sekunde (15 Mal)
  onTick() {
  }

  render() {
    return (
      <div>
        <h1>Promille Zähler</h1>
        {//this.state.audioData ? (
          //  this.state.audioData.map(
          //    (data) => {
          //      return <p>{data}</p>
          //    }
          //  )
          //) : null
        }
      </div>
    )
  }
}