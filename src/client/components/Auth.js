import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Auth extends Component {
  constructor() {
    super();
    this.login = this.login.bind(this);
  }

  render() {
    return (
      <form onSubmit={this.login}>
        Username: <input/>
        Password: <input/>
        <button>Sign in</button>
        or <Link to="/register">Register</Link>
      </form>
    );
  }

  login(evt) {
    evt.preventDefault();
    this.props.login('allen', 'passs');
  }
}
