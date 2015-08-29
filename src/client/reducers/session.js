import {BEGIN_LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, START_CHAT} from '../actions/constants';

const defaultState = {
  loading: false,
  currentUser: {},
  error: '',
  recentChats: []
}

export default (state=defaultState, action) => {
  switch (action.type) {
    case BEGIN_LOGIN:
      return {...state, loading: true, error: ''};
    case LOGIN_SUCCESS:
      return {...state, loading: false, currentUser: action.user};
    case LOGIN_FAILURE:
      return {...state, loading: false, error: 'wrong creds'};
    case LOGOUT:
      return {...state, currentUser: {}, recentChats: []};
    case START_CHAT:
      const recentChats = state.recentChats.slice(0).filter(partner => partner !== action.partner);
      recentChats.unshift(action.partner);
      return {...state, recentChats}
    default:
      return state;
  }
}
