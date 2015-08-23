import React, {Component} from 'react';

export default class ChatMessage extends Component {
  render() {
    return (
      <div>{this.props.message.user} says: {this.props.message.content}</div>
    );
  }
}
