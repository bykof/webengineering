import React, { Component } from 'react';
import Start from './components/Start';
import CreateParty from './components/CreateParty';
import JoinParty from './components/JoinParty';
import './App.css';


class App extends Component {
  constructor(){
    super();
    this.state = {
      name: "world"
    };
    // Notwendig, weil in der Funktion selber "this" genutzt wird
    // Methode bindet das Objekt an sich
    // Kann auch in Html geschrieben werden
    this.changeName = this.changeName.bind(this);
  }

  changeName(){
    this.setState({name: "leon"});
  }

  showValue(value){
    console.log(value);
  }

  render() {
    return (
        /*
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          {
            // If-Befehl in Html
          }
          {
            this.state.name === 'world' ? (
                'Welt'
            ) : (
                'Keine Welt'
            )
          }
          Hallo {this.state.name}
          <button onClick={this.changeName}>Klick mich!</button>
          {
            // Gibt den Inhalt des Input Fields wieder
          }
          <input onChange={(event) => {this.showValue(event.target.value)}}/>
      </div>
      */
        <div>
          <JoinParty/>
        </div>
    );
  }
}

export default App;
