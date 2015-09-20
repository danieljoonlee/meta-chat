import {
  BEGIN_LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT,
  RECENT_CHAT_UPDATE_SUCCESS,
  REFRESH_CURRENT_USER
} from './constants';
import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';
import Socket from '../socket';

export function logout() {
  return dispatch => {
    cookie.remove('token');
    Socket.logout();
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
          Socket.login();
          return json.user;
        })
    }
  };
}

export function updateRecentChat({user, partner, unread}) {
  return {
    types: [
      null,
      RECENT_CHAT_UPDATE_SUCCESS,
      null
    ],
    payload: {
      promise: fetch('http://localhost:3000/api/users/recents', {
        method: 'PUT',
        body: JSON.stringify({user, partner, unread}),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
    }
  };
}

export function refreshCurrentUser() {
  return {
    types: [
      null,
      REFRESH_CURRENT_USER,
      null
    ],
    payload: {
      promise: fetch('http://localhost:3000/api/user', {
        credentials: 'include'
      }).then(response => response.json())
    }
  }
}