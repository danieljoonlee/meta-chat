import {BEGIN_REGISTRATION, REGISTRATION_SUCCESS, REGISTRATION_FAILURE} from './constants';
import fetch from 'isomorphic-fetch';

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
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
    }
  };
}