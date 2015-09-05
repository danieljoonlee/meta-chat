import {BEGIN_LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT} from './constants';
import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';

export function logout() {
  return dispatch => {
    cookie.remove('token');
    dispatch({type: LOGOUT});
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
        body: JSON.stringify(creds),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(json => {
          cookie.set('token', json.token);
          return json.user;
        })
    }
  };
}