import {REQUEST_USERS, RECEIVE_USERS, FILTER_USERS} from '../actions/constants';
import * as util from '../../util';

const defaultState = {
  loading: false,
  users: [],
  filteredUsers: []
};

export default (state=defaultState, action) => {
  switch (action.type) {
    case REQUEST_USERS:
      return {...state, loading: true};
    case RECEIVE_USERS:
      return {...state, usersLoading: false, users: action.payload, filteredUsers: action.payload};
    case FILTER_USERS:
      const filteredUsers = state.users.filter(user => util.isSubObject(user, action.filterCriteria));
      return {...state, filteredUsers};
    default:
      return state;
  }
}