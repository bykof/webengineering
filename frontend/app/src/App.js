import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';

import Start from './components/Start';
import CreateParty from './components/CreateParty';
import JoinParty from './components/JoinParty';
import Lobby from './components/Lobby';
import Game from "./components/Game";
import GameTesting from "./components/GameTesting";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  renderStart(props) {
    return <Start {...props} application_store={this.props.application_store} />;
  }
  
  renderCreateParty(props) {
    return <CreateParty {...props} application_store={this.props.application_store} />;
  }
  
  renderJoinParty(props) {
    return <JoinParty {...props} application_store={this.props.application_store}/>;
  }
  
  renderLobby(props) {
    return <Lobby {...props} application_store={this.props.application_store}/>;
  }

  renderGame(props){
    return <Game {...props} application_store={this.props.application_store} />;
  }
  
  renderGameTesting(props) {
    return <GameTesting {...props} application_store={this.props.application_store} />;
  }

  render() {
    
    return (
      <Router>
        <div className="wrapper">
          <Route render={this.renderStart.bind(this)} path={'/'} exact={true}/>
          <Route render={this.renderCreateParty.bind(this)}  path={'/create-party'}/>
          <Route render={this.renderJoinParty.bind(this)} path={'/join-party'}/>
          <Route render={this.renderLobby.bind(this)} path={'/lobby'}/>
          <Route render={this.renderGame.bind(this)} path={'/game'}/>
          <Route render={this.renderGameTesting.bind(this)} path={'/gametesting/:game_id'}/>
        </div>
      </Router>
    );
  }
}

export default App;
