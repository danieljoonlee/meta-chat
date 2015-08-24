import React from 'react';
import {Route} from 'react-router';
import MainContainer from '../containers/MainContainer';
import UserBrowserContainer from '../containers/UserBrowserContainer';
import Register from './Register';
import Chat from './Chat/Chat';

export default (
  <Route component={MainContainer}>
    <Route path="/" component={UserBrowserContainer}/>
    <Route path="users" component={UserBrowserContainer}/>
    <Route path="register" component={Register}/>
    <Route path="chat/tom" component={Chat}/>
  </Route>
);
