import React, {Component} from 'react';
import {Link} from 'react-router';
import * as util from '../../../util';

export default class UserBox extends Component {
  constructor() {
    super();
    this.startChat = this.startChat.bind(this);
  }

  render() {
    const startChatLink = (
      <li>
        <Link to="chat" data-username={this.props.username.toLowerCase()} onClick={this.startChat}>
          Start Chat
        </Link>
      </li> 
    );

    return (
      <div>
        <ul>
          <li className="js-userbox-username">Name: {this.props.username}</li>
          <li>I speak: {util.capitalize(this.props.speaking)}</li>
          <li>I'm learning: {util.capitalize(this.props.learning)}</li>
          {this.props.currentUser.token ? startChatLink : ''}
        </ul>
      </div>
    );
  }

  startChat(evt) {
    const partner = evt.target.getAttribute('data-username');
    this.props.startChat(partner, this.props.currentUser.username);
  }
}
