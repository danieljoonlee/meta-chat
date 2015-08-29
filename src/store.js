import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import userBrowserReducer from './client/reducers/userBrowser';
import sessionReducer from './client/reducers/session';
import chatReducer from './client/reducers/chat';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const reducer = combineReducers({
  users: userBrowserReducer,
  session: sessionReducer,
  chat: chatReducer
});

export default createStoreWithMiddleware(reducer);