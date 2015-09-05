import {REQUEST_MESSAGES, RECEIVE_MESSAGES} from './constants';
import fetch from 'isomorphic-fetch';

export function startChat(currentUser, partner){
  const [user1, user2] = [currentUser, partner].map(encodeURIComponent);
  return {
    types: [
      REQUEST_MESSAGES,
      RECEIVE_MESSAGES,
      null
    ],
    payload: {
      promise: Promise.all([
        fetch(`http://localhost:3000/api/messages/${user1}/${user2}`).then(response => response.json()),
        fetch('/api/users', {
          method: 'PUT',
          body: JSON.stringify(partner),
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }})
      ]).then(values => values[0]),
      data: partner
    }
  };
}