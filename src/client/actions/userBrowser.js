import {REQUEST_USERS, RECEIVE_USERS} from './constants';
import fetch from 'isomorphic-fetch';

export function requestUsers() {
  return {
    type: REQUEST_USERS
  }
}

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  }
}

export function fetchUsers() {
  return dispatch => {
    dispatch(requestUsers);
    return fetch('/api/users')
      .then(response => response.json())
      .then(json => dispatch(receiveUsers(json)));
  }
}
