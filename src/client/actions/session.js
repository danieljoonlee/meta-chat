import {BEGIN_LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT} from './constants';
import fetch from 'isomorphic-fetch';

export function logout() {
  return {
    type: LOGOUT
  }
}

export function login(creds) {
  return {
    types: [
      BEGIN_LOGIN,
      LOGIN_SUCCESS,
      LOGIN_FAILURE
    ],
    payload: {
      promise: fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(creds)
      }).then(response => (response.json()))
    }
  };
}