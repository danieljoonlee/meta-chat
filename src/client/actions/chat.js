import {START_CHAT} from './constants';

export function startChat(partner){
  return {
    type: START_CHAT,
    partner
  }
}
