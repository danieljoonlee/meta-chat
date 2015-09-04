import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Nav extends Component {
  render() {
    const recentChats = (
      <ul>
        {this.props.recentChats.map(name => (<li key={name}>{name}</li>))}
      </ul>
    );

    return (
      <ul>
        <li><Link to="/users">Browse Users</Link></li>
        <li>
          RecentChats
          {this.props.recentChats.length > 0 ? recentChats : ''}
        </li>
      </ul>
    );
  }
}