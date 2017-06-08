import React from 'react';


export default class Error extends React.Component {
  render() {
    return (
      <div className="overlay">
        <div className="error-message">
          {this.props.children}
        </div>
      </div>
    );
  }
}