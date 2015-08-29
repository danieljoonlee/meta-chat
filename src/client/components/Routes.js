import React from 'react';
import {Route} from 'react-router';
import MainContainer from '../containers/MainContainer';
import UserBrowserContainer from '../containers/UserBrowserContainer';
import ChatContainer from '../containers/ChatContainer';
import Register from './Register';

export default (
  <Route component={MainContainer}>
    <Route path="/" component={UserBrowserContainer}/>
    <Route path="users" component={UserBrowserContainer}/>
    <Route path="chat" component={ChatContainer}/>
    <Route path="register" component={Register}/>
  </Route>
);
