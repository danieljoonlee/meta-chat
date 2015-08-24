import {BEGIN_LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE} from './constants';
import fetch from 'isomorphic-fetch';

function beginLogin(){
  return {
    type: BEGIN_LOGIN
  }
}

function loginSuccess(token) {
  return {
    type: LOGIN_SUCCESS,
    token
  }
}

function loginFailure() {
  return {
    type: LOGIN_FAILURE
  }
}

export default function login(username, password) {
  return dispatch => {
    dispatch(beginLogin());
    return fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({username, password})
    })
      .then(response => response.text())
      .then(token => {
        token ? dispatch(loginSuccess(token)) : dispatch(loginFailure());
      });
  }
}
