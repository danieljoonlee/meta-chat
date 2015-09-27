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

      const hasSubmessages = message.subMessages && message.subMessages.length;
      const messageClass = `js-message ${hasSubmessages ? "js-has-nested-messages" : ""}`;

      return (
        <div key={message._id}>
          <div className={messageClass} data-id={message._id} onClick={this.toggle}>
            {message.speaker} says: {message.content}
          </div>
          {message.expanded ? chatBox : null}
        </div>
      );
    };

    return (
      <div>
        <ul>
          {this.props.messages ? this.props.messages.map(chatMessage) : null}
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
    if (messageInputEl.value !== '') {
      const message = {
        parent: this.props.parent,
        partner: this.props.partner,
        content: messageInputEl.value
      };

      this.props.sendMessage(message);
      messageInputEl.value = '';
    }
  }
}