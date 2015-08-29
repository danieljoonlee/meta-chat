import React, {Component} from 'react';
import * as util from '../../../util';

export default class UserBox extends Component {
  constructor() {
    super();
    this.startChat = this.startChat.bind(this);
  }

  render() {
    return (
      <div>
        <ul>
          <li className="js-userbox-username">Name: {this.props.username}</li>
          <li>I speak: {util.capitalize(this.props.speaking)}</li>
          <li>I'm learning: {util.capitalize(this.props.learning)}</li>
          {this.props.loggedIn ? <li><a href="" data-username={this.props.username} onClick={this.startChat}>Start Chat</a></li> : ''}
        </ul>
      </div>
    );
  }

  startChat(evt) {
    evt.preventDefault();
    this.props.startChat(evt.target.getAttribute('data-username'));
  }
}
