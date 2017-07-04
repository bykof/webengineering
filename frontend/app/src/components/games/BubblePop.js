import GameComponent from "./GameComponent";
import React from "react";
import '../../styles/BubblePop.css'

export default class BubblePop extends GameComponent {
  constructor(props) {
    super(props);
    this.state = {
      timer: 3,
      top: 0,
      left: 0,
      size: 50,
      points: 0,
      color: ['red', 'green', 'blue'],
      colorIndex: 0,
      // Ist eine Liste aus Listen mit Spieler und Punkten
      members: []
    };

    this.timedText = this.timedText.bind(this);
    this.myTimeout1 = this.myTimeout1.bind(this);
    this.myTimeout2 = this.myTimeout2.bind(this);
    this.myTimeout3 = this.myTimeout3.bind(this);
    this.myTimeout4 = this.myTimeout4.bind(this);
    this.changeBubble = this.changeBubble.bind(this);
  }

  // Wird aufgerufen, wenn eine Nachricht über this.socket.send versendet wurde
  onDefaultMessage(data) {
    this.state.members[data.party_member.name] = data.clickCount;
    this.setState({members: this.state.members});
  }

  // Wird aufgerufen wenn das Spiel startet
  onGameStart() {
  }

  componentWillMount() {
    this.timedText();
  }

  componentDidMount() {
  }

  // Wird aufgerufen bei jeder Sekunde (15 Mal)
  onTick() {
  }

  //Gibt den Gewinner mit Punkte zurueck
  //aber bei Unentschieden eine Liste der Gewinner
  checkWinnerTeam() {
    // Name, Punkte, und 1 ist untentschieden
    let winner = [['default', 0,0]];
    for (let member in this.state.members) {
      if (this.state.members[member] > winner[0][1]) {
        winner = [member, this.state.members[member], 1];
      }
      else if (this.state.members[member] === winner[1]) {
        winner = [member, this.state.members[member], 0];
      }
    }
    return winner;
  }

  // Nach 15 sek wird diese Methode ausgeführt.
  // Return true, wenn Spieler/Team gewonnen hat
  // sons False
  // Bei unentschieden verlieren alle!
  onGameFinished() {
    let winner = this.checkWinnerTeam();
    //console.log(winners);
    //Wenn liste größer 1 dann immer unentschieden
    console.log(winner);
    if (this.props.application_store.current_member.name === winner[0] && winner[2] === 1) {
      super.onGameFinished(true);
      console.log("Gewonnen!");
    } else {
      console.log("Verloren!");
      super.onGameFinished(false);
    }

  }

  timedText() {
    setTimeout(this.myTimeout1, 1000);
    setTimeout(this.myTimeout2, 2000);
    setTimeout(this.myTimeout3, 3000);
    setTimeout(this.myTimeout4, 4000);
  }

  myTimeout1() {
    this.setState({timer: 2});
  }

  myTimeout2() {
    this.setState({timer: 1});
  }

  myTimeout3() {
    this.setState({timer: 0});
  }

  myTimeout4() {
    this.setState({timer: -1});
  }

  //Änderung von Fabe,Position und Größe
  changeBubble() {
    //Damit die Blase nicht aus dem Rand fällt, gibt es 30% Abstand.
    let top = Math.round((Math.random() * screen.height * 0.70) - screen.height / 2);
    let left = Math.round((Math.random() * screen.width * 0.70) - screen.width / 2);
    let size = Math.round((Math.random() * 100) + 50);
    let colorIndex = Math.round((Math.random() * 2));
    this.setState({top: top});
    this.setState({left: left});
    this.setState({size: size});
    this.setState({colorIndex: colorIndex});
    this.setState({points: this.state.points + 1}, () => {
      this.socket.send(
        {
          party_member: this.props.application_store.current_member,
          clickCount: this.state.points
        });
    });
  }

  renderPoints() {
    let renderedPoints = [];
    for (let member in this.state.members) {
      renderedPoints.push(
        <p key={member} className="points" style={{top: -200}}>
          {member} : {this.state.members[member]} <br/>
        </p>
      );
    }
    return renderedPoints;
  }

  render() {
    return (
      <div>
        {this.renderPoints()}
        {
          this.state.timer === -1 ? (
            <div>
              <span className="kreis" style={{
                top: this.state.top,
                left: this.state.left,
                width: this.state.size,
                height: this.state.size,
                backgroundColor: this.state.color[this.state.colorIndex]
              }}
                    onClick={this.changeBubble}> </span>
            </div>
          ) : (
            this.state.timer === 0 ? (
              <div>
                <h1>LOS!</h1>
              </div>
            ) : (
              <div>
                <h1>BubblePop</h1>
                <h2>Tippe die Seifenblasen an!</h2>
                <h2>{this.state.timer}</h2>
              </div>
            )
          )
        }
      </div>
    );
  }
}