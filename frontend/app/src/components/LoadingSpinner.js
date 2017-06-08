import React from 'react';

export default class LoadingSpinner extends React.Component {
  render() {
    return (
      <div className="overlay">
        <div className="spinner"/>
      </div>
    );
  }
}