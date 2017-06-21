import React from 'react';
import GameComponent from "./GameComponent";


export default class FastTipping extends GameComponent {
  constructor(props) {
    super(props);
    this.state = {
      clickCounter: 0,
      points: {},
    };
  }
  
  onDefaultMessage(data) {
    this.state.points[data.party_member.id] = {
      clickCount: data.clickCount,
      party_member: data.party_member
    };
    this.setState({points: this.state.points});
  }
  
  onClick() {
    this.setState(
      {clickCounter: this.state.clickCounter + 1},
      () => {
        this.socket.send(
          {
            party_member: this.props.application_store.current_member,
            clickCount: this.state.clickCounter
          }
        );
      }
    );
  }
  
  renderPoints() {
    let renderedPoints = [];
    for (let key in this.state.points) {
      renderedPoints.push(
        <p key={key}>
          {this.state.points[key].party_member.name}: {this.state.points[key].clickCount}
        </p>
      );
    }
    return renderedPoints;
  }
  
  onGameFinished() {
    super.onGameFinished();
  }
  
  render() {
    return (
      <div className="content">
        {this.renderPoints()}
        <button onClick={this.onClick.bind(this)}>CLICK ME</button>
      </div>
    );
  }
}