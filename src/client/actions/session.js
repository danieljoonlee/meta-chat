import {BEGIN_LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, RECENT_CHAT_UPDATE_SUCCESS} from './constants';
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

export function updateRecentChat(partner) {
  return {
    types: [
      null,
      RECENT_CHAT_UPDATE_SUCCESS,
      null
    ],
    payload: {
      promise: fetch('http://localhost:3000/api/users/recents', {
        method: 'PUT',
        body: JSON.stringify(partner),
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(response => response.json()),
      data: partner
    }
  };
}