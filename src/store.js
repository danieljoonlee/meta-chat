import {createStore, combineReducers, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import fetch from 'isomorphic-fetch';
import userBrowserReducer from './client/reducers/userBrowser';
import sessionReducer from './client/reducers/session';
import chatReducer from './client/reducers/chat';

const authMiddleware = store => next => action => {
  if (typeof action.auth !== 'function') {
    return next(action);
  }
  const token = store.getState().session.currentUser.token;
  function authFetch(url, options) {
    if (typeof options.body === 'string') {options.body = JSON.parse(options.body);}
    return fetch(url, {...options, body: JSON.stringify({...options.body, token})});
  }

  return next(action.auth(authFetch));
};

const middlewares = [
  authMiddleware,
  thunkMiddleware,
  promiseMiddleware,
  loggerMiddleware
];

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

const reducer = combineReducers({
  userBrowser: userBrowserReducer,
  session: sessionReducer,
  chat: chatReducer
});

export default initialState => createStoreWithMiddleware(reducer, initialState);