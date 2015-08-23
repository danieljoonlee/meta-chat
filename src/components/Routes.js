import React from 'react';
import {Route} from 'react-router';
import MainContainer from '../containers/MainContainer';
import Register from './Register';
import UserBrowser from './UserBrowser/UserBrowser';
import Chat from './Chat/Chat';

export default (
  <Route component={MainContainer}>
    <Route path="/" component={UserBrowser}/>
    <Route path="users" component={UserBrowser}/>
    <Route path="register" component={Register}/>
    <Route path="chat/tom" component={Chat}/>
  </Route>
);
