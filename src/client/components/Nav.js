import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Nav extends Component {
  render() {
    const recentChats = (
      <li>
        Recent Chats
        <ul>
          {this.props.recentChats.map(name => (<li>{name}</li>))}
        </ul>
      </li>
    )
    return (
      <ul>
        <li><Link to="/users">Browse Users</Link></li>
        {this.props.recentChats.length > 0 ? {recentChats} : ''}
      </ul>
    );
  }
}
