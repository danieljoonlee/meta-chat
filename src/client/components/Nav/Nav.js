import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Nav extends Component {
  render() {
    const recentChat = (recent) => {
      const chatUrl = `/chat/${recent.username}`;
      return (<li key={recent._id} className={recent.unread ? "js-recent-unread" : ""}><Link to={chatUrl}>{recent.username}</Link></li>);
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
          {this.props.currentUser.recentChats.length > 0 ? recentChats : null}
        </li>
      </ul>
    );
  }
}