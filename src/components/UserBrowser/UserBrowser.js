import React, {Component} from 'react';
import UserFilter from './UserFilter';
import UserBox from './UserBox';

export default class UserBrowser extends Component {
  render() {
    const users = ['tom', 'joe', 'mark'];

    return (
      <div>
        <h2>Browse Users</h2>
        <UserFilter/>
        {users.map(name => <UserBox username={name} key={name}/>)}
      </div>
    );
  }
}
