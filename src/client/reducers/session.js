import {BEGIN_LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, REGISTRATION_SUCCESS, RECENT_CHAT_UPDATE_SUCCESS} from '../actions/constants';

const defaultState = {
  loading: false,
  currentUser: {},
  error: '',
  recentChats: []
};

export default (state=defaultState, action) => {
  switch (action.type) {
    case BEGIN_LOGIN:
      return {...state, loading: true, error: ''};
    case LOGIN_SUCCESS:
    case REGISTRATION_SUCCESS:
      return {...state, loading: false, currentUser: action.payload};
    case LOGIN_FAILURE:
      return {...state, loading: false, error: 'wrong creds'};
    case LOGOUT:
      return {...state, currentUser: {}, recentChats: []};
    case RECENT_CHAT_UPDATE_SUCCESS:
      return ({...state, recentChats: action.payload});
    default:
      return state;
  }
}