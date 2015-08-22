import React from 'react';
import Router from 'react-router';
import {Provider} from 'react-redux';
import routes from './components/Routes';

export default function universalRouter(location, history) {
  return new Promise((resolve) => {
    Router.run(routes, location, (error, initialState, transition) => {
      if (history) { initialState.history = history; }
      resolve(
        <Provider>
          {() => <Router {...initialState} children={routes}/>}
        </Provider>
      );
    });
  });
}
