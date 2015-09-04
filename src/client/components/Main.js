import React, {Component} from 'react';
import {Link} from 'react-router';
import Header from './Header/Header';
import Nav from './Nav/Nav';

export default class Main extends Component {
  render() {
    return (
      <div>
        <Header {...this.props}/>
        <Nav {...this.props}/>
        {React.cloneElement(this.props.children, {currentUser: this.props.currentUser})}
      </div>
    );
  }
}
