import {REQUEST_USERS, RECEIVE_USERS, FILTER_USERS} from './constants';
import fetch from 'isomorphic-fetch';
import {DOMAIN} from '../../config';

export function fetchUsers() {
  return {
    types: [
      REQUEST_USERS,
      RECEIVE_USERS,
      null
    ],
    payload: {
      promise: fetch(`${DOMAIN}/api/users`).then(response => (response.json()))
    }
  }
}

export function filter(filterCriteria) {
  return {
    type: FILTER_USERS,
    filterCriteria
  }
}
