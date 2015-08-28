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
        <UserFilter {...this.props}/>
        {this.props.filteredUsers.map(user => 
          <UserBox {...user} loggedIn={!!this.props.currentUser.token} key={user.username}/>
        )}
      </div>
    );
  }
}
