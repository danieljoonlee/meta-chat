import React, {Component} from 'react';

export default class ChatMessages extends Component {
  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
  }

  render() {
    const chatMessage = message => (
      <li key={message._id}>
        <div data-id={message._id} onClick={this.toggle}>{message.speaker} says: {message.content}</div>
        {this.subMessages && <ChatMessages {...this.props} messages={this.subMessages}/>}
        {message.expanded && <input/>}
      </li>
    );
    return (
      <ul>
        {this.props.messages.map(message => chatMessage(message))}
      </ul>
    );
  }

  toggle(evt) {
    const messageId = evt.currentTarget.getAttribute('data-id');
    this.props.toggleMessageExpand(messageId);
  }
}