import React, {Component} from 'react';

export default class Nav extends Component {
  render() {
    return (
      <ul>
        <li>Browse Users</li>
        <li>
          Recent Chats
          <ul>
            <li>tom</li>
          </ul>
        </li>
      </ul>
    );
  }
}
