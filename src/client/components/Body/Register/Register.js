import React, {Component} from 'react';
import serialize from 'form-serialize';
import LanguageOptions from '../../LanguageOptions';

export default class Register extends Component {
  constructor() {
    super();
    this.register = this.register.bind(this);
  }

  render() {
    return (
      <div>
        <h2>Register</h2>
        <form onSubmit={this.register}>
          <label htmlFor="js-register-username">Username: </label>
          <input name="username" id="js-register-username"/>
          <br/>

          <label htmlFor="js-register-email">Email: </label>
          <input name="email" type="email" id="js-register-email"/>
          <br/>

          <label htmlFor="js-register-password">Password: </label>
          <input name="password" type="password" id="js-register-password"/>
          <br/>

          <label htmlFor="js-register-password-repeat">Password Again: </label>
          <input name="passrepeat" type="password" id="js-register-password-repeat"/>
          <br/>

          <label htmlFor="js-register-speaking">I speak: </label>
            <LanguageOptions name="speaking" id="js-register-speaking"/>
          <br/>

          <label htmlFor="js-register-learning">I'm learning: </label>
            <LanguageOptions name="learning" id="js-register-learning"/>
          <br/>

          <button>Submit</button>
        </form>
      </div>
    );
  }

  register(evt) {
    evt.preventDefault();
    var userData = serialize(evt.target, {hash: true});
    this.props.register(userData);
  }
}
