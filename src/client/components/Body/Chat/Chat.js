import React, {Component} from 'react';
import ChatMessages from './ChatMessages';

export default class Chat extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
  }

  render() {
    return (
      <div>
        <h2>Chat</h2>
        <div id="js-chat-content">
          <ChatMessages {...this.props}/>
        </div>
        <input name="messageInput" onKeyPress={this.submit}/>
      </div>
    );
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
