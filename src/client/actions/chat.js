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
      promise: fetch(`http://localhost:3000/api/messages/${user1}/${user2}`).then(response => response.json()),
      data: partner
    }
  };
}