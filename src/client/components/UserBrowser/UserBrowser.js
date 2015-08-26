import React, {Component} from 'react';
import UserFilter from './UserFilter';
import UserBox from './UserBox';

export default class UserBrowser extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    return (
      <div>
        <h2>Browse Users</h2>
        <UserFilter/>
        {this.props.users.map(user => <UserBox {...user} key={user.username}/>)}
      </div>
    );
  }
}
