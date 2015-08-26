import React, {Component} from 'react';

export default class UserBox extends Component {
  render() {
    return (
      <ul>
        <li>
          Name: {this.props.username}
        </li>
        <li>
          I speak: {this.props.speaking}
        </li>
        <li>
          I'm learning: {this.props.learning}
        </li>
      </ul>
    );
  }
}
