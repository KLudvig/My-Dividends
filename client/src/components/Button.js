import React from 'react';

export class Button extends React.Component {
  render() {
    return (
      <button className="add-button" onClick={this.props.onClick}>
        {this.props.title}
      </button>
    );
  }
}