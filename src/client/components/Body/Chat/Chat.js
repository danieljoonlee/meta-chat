import React, {Component} from 'react';
import ChatBox from './ChatBox';
import * as util from '../../../../util';

export default class Chat extends Component {
  render() {
    return (
      <div>
        <h2>Chat</h2>
        <div id="js-chat-content">
          <ChatBox {...this.props} messages={nestMessages(this.props.messages)} />
        </div>
      </div>
    );
  }
}

function nestMessages(messages) {
  messages = util.deepClone(messages);

  const idMap = {};
  messages.forEach(message => {
    idMap[message._id] = message;
  });

  const nestedMessages = [];
  messages.forEach(message => {
    if (message.parent) {
      idMap[message.parent].subMessages = idMap[message.parent].subMessages || [];
      idMap[message.parent].subMessages.push(message);
    } else {
      nestedMessages.push(message);
    }
  });

  return nestedMessages;
}