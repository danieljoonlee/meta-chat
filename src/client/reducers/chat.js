import {REQUEST_MESSAGES, RECEIVE_MESSAGES, RECEIVE_ONE_MESSAGE} from '../actions/constants';

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
    default:
      return state;
  }
}