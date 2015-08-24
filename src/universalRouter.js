import React from 'react';
import Router from 'react-router';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import routes from './client/components/Routes';
import reducer from './client/reducers/userBrowser';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer);

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
