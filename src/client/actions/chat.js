import {REQUEST_MESSAGES, RECEIVE_MESSAGES} from './constants';
import fetch from 'isomorphic-fetch';

export function startChat(partner, currentUser){
  const [user1, user2] = [partner, currentUser].map(encodeURIComponent);
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