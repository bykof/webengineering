import React, {Component} from 'react';

export default class CreateParty extends Component {
  render() {
    return (
      <div className="content pad-top">
        <form>
          <label>Wie ist dein Name?</label>
          <input type="text" placeholder="Max Mustermann"/>
        </form>
        <nav className="bar bar-tab">
          <a href="#" className="tab-item danger" onClick={() => {this.props.history.goBack()}}>Zurück</a>
          <a href="#" className="tab-item primary">Erstellen</a>
        </nav>
      </div>
    );
  }
}