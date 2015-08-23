import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Nav extends Component {
  render() {
    return (
      <ul>
        <li><Link to="/users">Browse Users</Link></li>
        <li>
          Recent Chats
          <ul>
            <li><Link to="/chat/tom">tom</Link></li>
          </ul>
        </li>
      </ul>
    );
  }
}
