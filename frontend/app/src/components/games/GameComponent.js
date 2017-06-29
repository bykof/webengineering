import React from "react";


export default class GameComponent extends React.Component {
  
  MAX_GAME_SECONDS = 15;
  
  constructor(props) {
    super(props);
    
    this.socket = this.props.application_store.party_socket;
    this.socket.onDefaultMessage.push(this.onDefaultMessage.bind(this));
    
    this.onGameStart = this.onGameStart.bind(this);
    this.onGameFinished = this.onGameFinished.bind(this);
    this.onTick = this.onTick.bind(this);
    
    this.onTickInterval = setInterval(
      this.onTick,
      1000
    );
    
    this.onGameFinishedTimeout = setTimeout(
      this.onGameFinished,
      this.MAX_GAME_SECONDS * 1000
    );

    this.onGameStart();
  }
  
  componentWillMount() {
    this.setState(
      {
        tick: 0
      }
    );
  }
  
  componentWillUnmount() {
    clearTimeout(this.onGameFinishedTimeout);
  }
  
  onDefaultMessage(data) {
    console.log(data);
  }
  
  get team() {}
  
  
  onGameStart() {
    if ('onGameStart' in this.props) this.props.onGameStart();
  }
  
  onGameFinished(data) {
    clearInterval(this.onTickInterval);
    if ('onGameFinished' in this.props) this.props.onGameFinished(data);
  }
  
  onTick() {
    if ('onTick' in this.props) this.props.onTick();
    this.setState({tick: this.state.tick + 1});
  }
  
  render() {
    throw 'NotImplemented!';
  }
}