import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';

import Start from './components/Start';
import CreateParty from './components/CreateParty';
import JoinParty from './components/JoinParty';
import Lobby from './components/Lobby';


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

  render() {
    
    return (
      <Router>
        <div className="wrapper">
          <Route render={this.renderStart.bind(this)} path={'/'} exact={true}/>
          <Route render={this.renderCreateParty.bind(this)}  path={'/create-party'}/>
          <Route component={JoinParty} path={'/join-party'}/>
          <Route component={Lobby} path={'/lobby'}/>
        </div>
      </Router>
    );
  }
}

export default App;
