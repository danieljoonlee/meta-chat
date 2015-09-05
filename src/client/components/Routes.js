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
    <Route path="chat/:user1/:user2" component={ChatContainer} onEnter={ChatContainer.fetchData(store)}/>
    <Route path="register" component={RegisterContainer}/>
  </Route>
);