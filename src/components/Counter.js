import React, {Component} from 'react';

export default class Counter extends Component {
  render() {
    return (
      <button onClick={this.props.increment}>
        {this.props.value}
      </button>
    );
  }
}
