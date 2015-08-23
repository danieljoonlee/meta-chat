import React, {Component} from 'react';

export default class Register extends Component {
  render() {
    return (
      <div>
        <h2>Register</h2>
        <form>
          <label htmlFor="js-register-username">Username: </label>
          <input id="js-register-username"/>
          <br/>

          <label htmlFor="js-register-email">Email: </label>
          <input type="email" id="js-register-email"/>
          <br/>

          <label htmlFor="js-register-password">Password: </label>
          <input type="password" id="Js-register-password"/>
          <br/>

          <label htmlFor="js-register-password-repeat">Password Again: </label>
          <input type="password" id="js-register-password-repeat"/>
          <br/>

          <button>Submit</button>
        </form>
      </div>
    );
  }
}
