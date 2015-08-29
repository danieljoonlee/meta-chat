import React from 'react';
import Router from 'react-router';
import {history} from 'react-router/lib/BrowserHistory';
import {Provider} from 'react-redux';
import routes from './components/Routes';
import store from '../store';

const AppComponent = (
  <Provider store={store}>
    {() => <Router children={routes} history={history}/>}
  </Provider>
);

React.render(AppComponent, document.getElementById('content'));