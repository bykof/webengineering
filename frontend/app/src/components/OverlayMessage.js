import React from 'react';


export default class OverlayMessage extends React.Component {
  render() {
    return (
      <div className="overlay">
        <div className="message">
          {this.props.children}
        </div>
      </div>
    );
  }
}