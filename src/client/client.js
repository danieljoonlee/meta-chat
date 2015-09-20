import React from 'react';
import Router from 'react-router';
import {Provider} from 'react-redux';
import cookie from 'js-cookie';
import routes from './components/Routes';
import initStore from '../store';
import Socket from './socket';
import history from './history';

const store = initStore(REDUX_INITIAL_STATE);

Socket.init(store);

const AppComponent = (
  <Provider store={store}>
    {() => <Router children={routes(store)} history={history}/>}
  </Provider>
);

React.render(AppComponent, document.getElementById('content'));