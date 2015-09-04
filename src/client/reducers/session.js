import {BEGIN_LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, REQUEST_MESSAGES} from '../actions/constants';

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
      return {...state, loading: false, currentUser: action.payload.user};
    case LOGIN_FAILURE:
      return {...state, loading: false, error: 'wrong creds'};
    case LOGOUT:
      return {...state, currentUser: {}, recentChats: []};
    case REQUEST_MESSAGES:
      const recentChats = [action.payload].concat(
        [...state.recentChats].filter(partner => partner !== action.payload)
      );
      return ({...state, recentChats});
    default:
      return state;
  }
}
