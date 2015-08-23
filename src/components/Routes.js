import React from 'react';
import {Route} from 'react-router';
import MainContainer from '../containers/MainContainer';
import Register from './Register';
import UserBrowser from './UserBrowser/UserBrowser';

export default (
  <Route component={MainContainer}>
    <Route path="register" component={Register}/>
    <Route path="/" component={UserBrowser}/>
  </Route>
);
