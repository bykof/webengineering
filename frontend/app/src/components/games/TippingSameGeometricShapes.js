import React from 'react';
import GameComponent from "./GameComponent";
import bomb from '../../assets/bomb.png';

export default class ExampleGame extends GameComponent {
  constructor(props){
    super(props);
    this.state = {
      points : 0,
      timer : 3,
      is_shape : false,
      shapes: ['triangle', 'square', 'circle'],
      shape: {
        triangle : bomb,
        square: bomb,
        circle: bomb
      }
    };
    this.updateShapeState = this.updateShapeState.bind(this);
  }

  updateShapeState(event){
    this.setState({is_shape: true});
  }

  // Wird aufgerufen, wenn eine Nachricht über this.socket.send versendet wurde
  onDefaultMessage(data) {
    this.state.members[data.party_member.name] = data.clickCount;
    //console.log(this.state.members);
  }

  // Wird aufgerufen wenn das Spiel vorbei ist (nach 15 Sekunden)
  onGameFinished() {}

  // Wird aufgerufen wenn das Spiel startet
  onGameStart() {}

  // Wird aufgerufen bei jeder Sekunde (15 Mal)
  onTick() {}

  onClick() {

  }

  renderPoints() {
    let renderedPoints = [];
    for (let member in this.state.members) {
      renderedPoints.push(
        <p key={member}>
          {member} : {this.state.members[member]}
        </p>
      );
    }
    return renderedPoints;
  }

  componentDidMount(){
    console.log(this.state.shape.triangle);
  }

  shapeRandom(){
    let number = Math.round(Math.random() * 3);
    console.log(number);
    if(number === 1){
      return this.state.shape.triangle;
    }else if(number === 2){
      return this.state.shape.square;
    }else{
      return this.state.shape.circle;
    }

  }

  render() {
    return (
      <div>
        <img className="Shape" src={bomb}/>
        <img className="Shape" src={this.state.shape.triangle}/>
        <img className="Shape" src={this.shapeRandom()}/>
      </div>
    );
  }
}

/*
1. Alle Formen Rendern
2. wenn eine Form angeklickt wird, merke dir was das für ein Shape ist und wenn die nächste
angeklickte Form den gleichen Shape hat, dann entferne die beiden shapes.
3. wenn 2. erfolgreich erhöhe um einen Punkt.
*/