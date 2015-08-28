import React, {Component} from 'react';
import * as util from '../../../util';

export default class UserBox extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>Name: {this.props.username}</li>
          <li>I speak: {util.capitalize(this.props.speaking)}</li>
          <li>I'm learning: {util.capitalize(this.props.learning)}</li>
          {this.props.loggedIn ? <li><a href="">Start Chat</a></li> : ''}
        </ul>
      </div>
    );
  }
}
