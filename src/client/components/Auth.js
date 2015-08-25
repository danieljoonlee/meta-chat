import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Auth extends Component {
  constructor() {
    super();
    this.login = this.login.bind(this);
  }

  render() {
    return (
      <div>
        {this.props.error}
        <form onSubmit={this.login}>
          Username: <input name="username"/>
          Password: <input name="password"/>
          <button>Sign in</button>
          or <Link to="/register">Register</Link>
        </form>
      </div>
    );
  }

  login(evt) {
    evt.preventDefault();
    const inputs = evt.target.querySelectorAll('input');
    const username = inputs[0].value;
    const password = inputs[1].value;
    this.props.login(username, password);
  }
}
