import React, {Component} from 'react';
import {Link} from 'react-router';
import * as util from '../../../../util';

export default class UserBox extends Component {
  render() {
    const startChatLink = (
      <li>
        <Link to={`/chat/${this.props.username}`} data-username={this.props.username.toLowerCase()}>
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
          {this.props.currentUser.username ? startChatLink : null}
        </ul>
      </div>
    );
  }
}
