import React from 'react';
import Router from 'react-router';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import routes from './components/Routes';
import reducer from './reducers/user';

const store = createStore(reducer);

export default function universalRouter(location, history) {
  return new Promise((resolve, reject) => {
    Router.run(routes, location, (error, initialState) => {
      if (error) { reject(error); }

      if (history) { initialState.history = history; }

      resolve(
        <Provider store={store}>
          {() => <Router {...initialState} children={routes}/>}
        </Provider>
      );
    });
  });
}
