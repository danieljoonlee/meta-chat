import React, {Component} from 'react';

export default class Auth extends Component {
  render() {
    return (
      <div>
        Username: <input/>
        Password: <input/>
        <button>Sign in</button>
        or <a href="#">Register</a>
      </div>
    );
  }
}
