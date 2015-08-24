import {REQUEST_USERS, RECEIVE_USERS} from '../actions/constants';

const defaultState = {
  usersLoading: false,
  users: []
}

export default (state=defaultState, action) => {
  switch (action.type) {
    case REQUEST_USERS:
      return {...state, usersLoading: true};
    case RECEIVE_USERS:
      return {
        ...state,
        usersLoading: false,
        users: action.users
      };
    default:
      return state;
  }
}
