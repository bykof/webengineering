import GameComponent from "./GameComponent";
import React from "react";
import '../../styles/BubblePop.css'

export default class BubblePop extends GameComponent {
  constructor(props) {
    super(props);
    this.state = {counter: 3}
    this.timedText = this.timedText.bind(this);
    this.myTimeout1 = this.myTimeout1.bind(this);
    this.myTimeout2 = this.myTimeout2.bind(this);
    this.myTimeout3 = this.myTimeout3.bind(this);
    this.myTimeout4 = this.myTimeout4.bind(this);
  }


  // Wird aufgerufen, wenn eine Nachricht über this.socket.send versendet wurde
  onDefaultMessage(data) {
  }

  // Wird aufgerufen wenn das Spiel vorbei ist (nach 15 Sekunden)
  onGameFinished() {
  }

  // Wird aufgerufen wenn das Spiel startet
  onGameStart() {
  }

  componentWillMount() {
    this.timedText();
  }

  // Wird aufgerufen bei jeder Sekunde (15 Mal)
  onTick() {
  }

  timedText() {
    setTimeout(this.myTimeout1, 1000)
    setTimeout(this.myTimeout2, 2000)
    setTimeout(this.myTimeout3, 3000)
    setTimeout(this.myTimeout4, 4000)
  }

  myTimeout1() {
    this.setState({counter: 2});
  }

  myTimeout2() {
    this.setState({counter: 1});
  }

  myTimeout3() {
    this.setState({counter: 0});
  }

  myTimeout4() {
    this.setState({counter: -1});
  }

  changeBubble(){

  }

  render() {
    return (
      <div>
        {
          this.state.counter === -1 ? (
            <div>
              <div className="kreis" onClick={this.changeBubble}>Drück mich</div>
            </div>
          ) : (
            this.state.counter === 0 ? (
              <div>
                <h1>LOS!</h1>
              </div>
            ) : (
              <div>
                <h1>BubblePop</h1>
                <h2>Tippe die Seifenblasen an!</h2>
                <h2>{this.state.counter}</h2>
              </div>
            )
          )
          }
      </div>
    );
  }
}