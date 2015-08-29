import {REQUEST_MESSAGES, RECEIVE_MESSAGES} from './constants';
import fetch from 'isomorphic-fetch';

function requestMessages(partner) {
  return {
    type: REQUEST_MESSAGES,
    partner
  }
}

function receiveMessages(messages) {
  return {
    type: RECEIVE_MESSAGES,
    messages
  }
}

export function startChat(partner, currentUser){
  const [user1, user2] = [partner, currentUser].map(encodeURIComponent);
  
  return dispatch => {
    dispatch(requestMessages(partner));
    return fetch(`/api/messages/${user1}/${user2}`)
      .then(response => response.json())
      .then(json => dispatch(receiveMessages(json)));
  }
}
