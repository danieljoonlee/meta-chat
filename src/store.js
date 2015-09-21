import {createStore, combineReducers, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import userBrowserReducer from './client/reducers/userBrowser';
import sessionReducer from './client/reducers/session';
import chatReducer from './client/reducers/chat';

const middlewares = [
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