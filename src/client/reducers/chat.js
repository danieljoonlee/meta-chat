import {RECEIVE_MESSAGES} from '../actions/constants';

const defaultState = {
  messages: []
}

export default (state=defaultState, action) => {
  switch (action.type) {
    case RECEIVE_MESSAGES:
      return {...state, messages: action.messages}
    default:
      return state;
  }
}
