import {BEGIN_REGISTRATION, REGISTRATION_SUCCESS, REGISTRATION_FAILURE} from './constants';
import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';
import Socket from '../socket';
import history from '../history';

export function register(newUserData){
  return {
    types: [
      BEGIN_REGISTRATION,
      REGISTRATION_SUCCESS,
      REGISTRATION_FAILURE
    ],
    payload: {
      promise: fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(newUserData),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(json => {
          cookie.set('token', json.token);
          Socket.login();
          history.replaceState(null, '/users');
          return json;
        })
    }
  };
}