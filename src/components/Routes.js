import React from 'react';
import {Route} from 'react-router';
import MainContainer from '../containers/MainContainer';
import Register from './Register';
import Chat from './Chat/Chat';

export default (
  <Route path="/" component={MainContainer}>
    <Route path="register" component={Register}/>
    <Route path="chat/tom" component={Chat}/>
  </Route>
);
