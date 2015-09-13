import React, {Component} from 'react';

export default class ChatBox extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  render() {
    const chatMessage = message => {
      const chatBox = (
        <ChatBox
          {...this.props}
          messages={message.subMessages}
          parent={message._id}
        />
      );

      return (
        <div key={message._id}>
          <div data-id={message._id} onClick={this.toggle}>
            {message.speaker} says: {message.content}
          </div>
          {message.expanded && chatBox}
        </div>
      );
    };

    return (
      <div>
        <ul>
          {this.props.messages && this.props.messages.map(message => chatMessage(message))}
        </ul>
        <form onSubmit={this.submit}>
          <input/>
          <button>send</button>
        </form>
      </div>
    );
  }

  toggle(evt) {
    const messageId = evt.currentTarget.getAttribute('data-id');
    this.props.toggleMessageExpand(messageId);
  }

  submit(evt) {
    evt.preventDefault();

    const messageInputEl = evt.target.querySelector('input');
    const message = {
      parent: this.props.parent,
      partner: this.props.partner,
      content: messageInputEl.value
    };

    this.props.sendMessage(message);
    messageInputEl.value = '';
  }
}