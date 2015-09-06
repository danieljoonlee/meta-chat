import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Chat from '../components/Body/Chat/Chat';
import * as chatActionCreators from '../actions/chat';
import * as sessionActionCreators from '../actions/session';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(chatActionCreators, dispatch);
}

const ChatContainer = connect(state => state.chat, mapDispatchToProps)(Chat);

ChatContainer.startChat = store => (routerState, transition, done) => {
  if (store.getState().chat.partner === routerState.params.user2) {
    done();
  } else {
    const {user1, user2} = routerState.params;
    Promise.all([
      store.dispatch(sessionActionCreators.updateRecentChat(user2)),
      store.dispatch(chatActionCreators.fetchMessages(user1, user2))
    ]).then(() => {done()})
  }
};

export default ChatContainer;