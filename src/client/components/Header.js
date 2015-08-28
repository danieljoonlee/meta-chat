import React, {Component} from 'react';
import Login from '../components/Login';

export default class Header extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  render() {
    const welcome = (
      <div>Welcome {this.props.currentUser.username} | <a href="" onClick={this.logout}>Logout</a></div>
    );

    return (
      <div>
        {this.props.currentUser.username ? {welcome} : <Login {...this.props}/>}
      </div>
    );
  }

  logout(evt) {
    evt.preventDefault();
    this.props.logout();
  }
}
