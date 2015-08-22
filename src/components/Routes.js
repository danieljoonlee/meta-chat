import React from 'react';
import {Route} from 'react-router';
import MainContainer from '../containers/MainContainer';
import Register from './Register';

export default (
  <Route path="/" component={MainContainer}>
    <Route path="register" component={Register}/>
  </Route>
);
