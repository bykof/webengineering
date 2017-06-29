import React from "react";


export default class GameComponent extends React.Component {
  
  static MAX_GAME_SECONDS = 15;
  
  static description = 'Bitte noch eine Beschreibung zum Spiel hinzufügen!!!';
  
  /**
   * Das GameComponent dient dazu alle Spiele zu generalisieren.
   * Es funktioniert quesi wie eine abstrakte Klasse.
   *
   * Props werden befüllt mit:
   * - application_store - der aktuelle Application Store
   * - teams: Eine Liste von Listen mit den jeweiligen TeamMembern
   *
   * Beispiel für teams:
   *
   * [
   *   [
   *     {party_member_1}, {party_member_2}
   *   ],
   *   [
   *     {party_member_3}, {party_member_4}
   *   ]
   * ]
   *
   * @param props
   */
  
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
      GameComponent.MAX_GAME_SECONDS * 1000
    )
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
  
  onGameFinished(won) {
    clearInterval(this.onTickInterval);
    if ('onGameFinished' in this.props) this.props.onGameFinished(won);
  }
  
  onTick() {
    if ('onTick' in this.props) this.props.onTick();
    this.setState({tick: this.state.tick + 1});
  }
  
  render() {
    return <div>NotImplemented!</div>;
  }
}