import React, {Component} from 'react';

export default class JoinParty extends Component {
  render() {
    return (
      <div className="content pad-top">
        <form>
          <label>Name</label>
          <input type="text" placeholder="Max Mustermann"/>
          <label>Gruppencode</label>
          <input type="text" placeholder="123XYZ"/>
        </form>
        <nav className="bar bar-tab">
          <a href="#" className="tab-item danger" onClick={() => {this.props.history.goBack()}}>Zurück</a>
          <a href="#" className="tab-item primary">Beitreten</a>
        </nav>
      </div>
    );
  }
}