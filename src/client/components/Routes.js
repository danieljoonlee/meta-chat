import React from 'react';
import {Route} from 'react-router';
import MainContainer from '../containers/MainContainer';
import UserBrowserContainer from '../containers/UserBrowserContainer';
import ChatContainer from '../containers/ChatContainer';
import RegisterContainer from '../containers/RegisterContainer';

export default store => (
  <Route component={MainContainer}>
    <Route path="/" component={UserBrowserContainer} onEnter={UserBrowserContainer.fetchData(store)}>
      <Route path="users"/>
    </Route>
    <Route path="chat/:partner" component={ChatContainer} onEnter={ChatContainer.startChat(store)}/>
    <Route path="register" component={RegisterContainer}/>
  </Route>
);