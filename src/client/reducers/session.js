import {BEGIN_LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT} from '../actions/constants';

const defaultState = {
  loading: false,
  user: {},
  error: '',
  recentChats: []
}

export default (state=defaultState, action) => {
  switch (action.type) {
    case BEGIN_LOGIN:
      return {...state, loading: true, error: ''};
    case LOGIN_SUCCESS:
      return {...state, loading: false, user: action.user, recentChats: ['tom', 'brady']};
    case LOGIN_FAILURE:
      return {...state, loading: false, error: 'wrong creds'};
    case LOGOUT:
      return {...state, user: {}, recentChats: []};
    default:
      return state;
  }
}
