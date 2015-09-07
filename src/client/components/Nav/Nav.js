import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Nav extends Component {
  render() {
    const recentChat = (name) => {
      const chatUrl = `/chat/${name}`;
      return (<li key={name}><Link to={chatUrl}>{name}</Link></li>);
    };

    const recentChats = (
      <ul>
        {this.props.currentUser.recentChats.map(recentChat)}
      </ul>
    );

    return (
      <ul>
        <li><Link to="/users">Browse Users</Link></li>
        <li>
          RecentChats
          {this.props.currentUser.recentChats.length > 0 ? recentChats : ''}
        </li>
      </ul>
    );
  }
}