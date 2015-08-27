import React, {Component} from 'react';
import * as util from '../../../util';

export default class UserBox extends Component {
  render() {
    return (
      <ul>
        <li>
          Name: {this.props.username}
        </li>
        <li>
          I speak: {util.capitalize(this.props.speaking)}
        </li>
        <li>
          I'm learning: {util.capitalize(this.props.learning)}
        </li>
      </ul>
    );
  }
}
