import {REQUEST_MESSAGES, RECEIVE_MESSAGES, RECEIVE_ONE_MESSAGE, TOGGLE_MESSAGE_EXPAND} from '../actions/constants';
import * as util from '../../util';

const defaultState = {
  partner: null,
  messages: []
};

export default (state=defaultState, action) => {
  switch (action.type) {
    case REQUEST_MESSAGES:
      return {...state, partner: action.payload};
    case RECEIVE_MESSAGES:
      return {...state, messages: action.payload};
    case RECEIVE_ONE_MESSAGE:
      return {...state, messages: [...state.messages, action.payload]};
    case TOGGLE_MESSAGE_EXPAND:
      return {...state, messages: toggleExpand(state.messages, action.payload)};
    default:
      return state;
  }
}

function toggleExpand(messages, id) {
  const messagesClone = util.deepClone(messages);
  const toggledMessage = messagesClone.find(message => message._id === id);
  toggledMessage.expanded = !toggledMessage.expanded;
  return messagesClone;
}