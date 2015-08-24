import React, {Component} from 'react';
import Auth from '../components/Auth';

export default class Header extends Component {
  render() {
    return (
      <Auth {...this.props}/>
    );
  }
}
