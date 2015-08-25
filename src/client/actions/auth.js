import {BEGIN_LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT} from './constants';
import fetch from 'isomorphic-fetch';

function beginLogin(){
  return {
    type: BEGIN_LOGIN
  }
}

function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user
  }
}

function loginFailure() {
  return {
    type: LOGIN_FAILURE
  }
}

export function logout() {
  return {
    type: LOGOUT
  }
}

export function login(username, password) {
  return dispatch => {
    dispatch(beginLogin());
    return fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({username, password})
    })
      .then(response => response.json())
      .then(user => {
        user.token ? dispatch(loginSuccess(user)) : dispatch(loginFailure());
      });
  }
}
