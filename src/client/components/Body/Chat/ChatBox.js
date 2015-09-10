import React, {Component} from 'react';

export default class ChatBox extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  render() {
    const chatMessage = message => (
      <div key={message._id}>
        <div data-id={message._id} onClick={this.toggle}>{message.speaker} says: {message.content}</div>
        {
          message.expanded &&
          <ChatBox
            messages={message.subMessages}
            sendMessage={this.props.sendMessage}
            partner={this.props.partner}
          />
        }
      </div>
    );
    return (
      <div>
        <ul>
          {this.props.messages && this.props.messages.map(message => chatMessage(message))}
        </ul>
        <input name="messageInput" onKeyPress={this.submit}/>
      </div>
    );
  }

  toggle(evt) {
    const messageId = evt.currentTarget.getAttribute('data-id');
    this.props.toggleMessageExpand(messageId);
  }

  submit(evt) {
    if (evt.which === 13) {
      const message = {
        partner: this.props.partner,
        content: evt.target.value
      };
      this.props.sendMessage(message);
      evt.target.value = '';
    }
  }
}