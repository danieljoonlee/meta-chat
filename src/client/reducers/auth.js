import {BEGIN_LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE} from '../actions/constants';

const defaultState = {
  loading: false,
  token: null,
  error: ''
}

export default (state=defaultState, action) => {
  switch (action.type) {
    case BEGIN_LOGIN:
      return {...state, loading: true};
    case LOGIN_SUCCESS:
      return {...state, loading: false, token: action.token};
    case LOGIN_FAILURE:
      return {...state, error: 'wrong creds'};
    default:
      return state;
  }
}
