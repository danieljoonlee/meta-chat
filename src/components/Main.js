import React, {Component} from 'react';
import {Link} from 'react-router';
import Header from './Header';
import Nav from './Nav';

export default class Main extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Nav/>
        {this.props.children}
      </div>
    );
  }
}
