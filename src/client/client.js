import React from 'react';
import Router from 'react-router';
import {history} from 'react-router/lib/BrowserHistory';
import {Provider} from 'react-redux';
import routes from './components/Routes';
import initStore from '../store';

const store = initStore(REDUX_INITIAL_STATE);

const AppComponent = (
  <Provider store={store}>
    {() => <Router children={routes(store)} history={history}/>}
  </Provider>
);

React.render(AppComponent, document.getElementById('content'));