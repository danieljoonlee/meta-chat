import React, {Component} from 'react';

export default class UserBox extends Component {
  render() {
    return (<div>{this.props.username}</div>);
  }
}
