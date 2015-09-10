import React, {Component} from 'react';
import ChatBox from './ChatBox';

export default class Chat extends Component {
  render() {
    return (
      <div>
        <h2>Chat</h2>
        <div id="js-chat-content">
          <ChatBox {...this.props}/>
        </div>
      </div>
    );
  }
}
