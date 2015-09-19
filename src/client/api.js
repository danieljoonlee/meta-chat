import {fetchMessages, leaveChatActionCreator} from './actions/chat';
import {updateRecentChat} from './actions/session';
import {fetchUsers} from './actions/userBrowser';

export const startChat = store => (routerState, transition, done) => {
  const partner = routerState.params.partner;
  const currentUser = store.getState().session.currentUser.username;

  Promise.all([
    store.dispatch(updateRecentChat(currentUser, partner)),
    store.dispatch(fetchMessages(partner))
  ]).then(() => {done()})
};

export const leaveChat = store => () => {
  store.dispatch(leaveChatActionCreator());
};

export const fetchUserData = store => (state, transition, done) => {
  if (store.getState().userBrowser.users.length > 0) {
    done();
  } else {
    store.dispatch(fetchUsers()).then(()=> done());
  }
};
