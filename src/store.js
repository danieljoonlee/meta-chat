import {createStore, combineReducers, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import userBrowserReducer from './client/reducers/userBrowser';
import sessionReducer from './client/reducers/session';
import chatReducer from './client/reducers/chat';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);

const reducer = combineReducers({
  userBrowser: userBrowserReducer,
  session: sessionReducer,
  chat: chatReducer
});

export default initialState => createStoreWithMiddleware(reducer, initialState);