import React, {Component} from 'react';
import serialize from 'form-serialize';
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
          Password: <input name="password" type="password"/>
          <button>Sign in</button>
          or <Link to="/register">Register</Link>
        </form>
      </div>
    );
  }

  login(evt) {
    evt.preventDefault();
    this.props.login(serialize(evt.target, {hash: true}));
  }
}
