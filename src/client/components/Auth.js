import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Auth extends Component {
  render() {
    return (
      <div>
        Username: <input/>
        Password: <input/>
        <button>Sign in</button>
        or <Link to="/register">Register</Link>
      </div>
    );
  }
}
