import {REQUEST_MESSAGES, RECEIVE_MESSAGES, RECEIVE_ONE_MESSAGE} from './constants';
import fetch from 'isomorphic-fetch';
import socket from '../socket';

export function fetchMessages(partner){
  return {
    types: [
      REQUEST_MESSAGES,
      RECEIVE_MESSAGES,
      null
    ],
    payload: {
      promise: fetch(`http://localhost:3000/api/messages/${partner}`, {
        credentials: 'include'
      }).then(response => response.json()),
      data: partner
    }
  };
}

export function sendMessage(content) {
  return {
    types: [
      null,
      RECEIVE_ONE_MESSAGE,
      null
    ],
    payload: {
      promise: fetch('http://localhost:3000/api/messages', {
        method: 'POST',
        body: JSON.stringify(content),
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(message => {
          socket.emit('message', message);
          return message;
        })
    }
  };
}