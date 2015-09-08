import {REQUEST_MESSAGES, RECEIVE_MESSAGES, RECEIVE_ONE_MESSAGE, TOGGLE_MESSAGE_EXPAND} from './constants';
import fetch from 'isomorphic-fetch';
import Socket from '../socket';

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

export function receiveMessage(message) {
  return {
    type: RECEIVE_ONE_MESSAGE,
    payload: message
  }
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
          Socket.socket.emit('message', message);
          return message;
        })
    }
  };
}

export function toggleMessageExpand(id) {
  return {
    types: [
      TOGGLE_MESSAGE_EXPAND,
      null,
      null
    ],
    payload: {
      // uncomment when you want to persist message expansion
      promise: Promise.resolve(1),
      //promise: fetch('', {
      //  method: 'POST',
      //  body: JSON.stringify(id),
      //  credentials: 'include',
      //  headers: {
      //    'Accept': 'application/json',
      //    'Content-Type': 'application/json'
      //  }
      //}),
      data: id
    }
  }
}