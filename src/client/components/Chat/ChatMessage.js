import React, {Component} from 'react';

export default class ChatMessage extends Component {
  render() {
    return (
      <div>{this.props.speaker} says: {this.props.content}</div>
    );
  }
}
