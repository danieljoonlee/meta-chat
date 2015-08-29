import React, {Component} from 'react';
import ChatMessage from './ChatMessage';

export default class Chat extends Component {
  render() {
    debugger;
    return (
      <div>
        <h2>Chat</h2>
        <div id="js-chat-content">
          {this.props.messages.map(message => <ChatMessage {...message} key={message._id}/>)}
        </div>
        <input/>
      </div>
    );
  }
}
