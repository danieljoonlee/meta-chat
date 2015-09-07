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
  const partner = routerState.params.partner;
  Promise.all([
    store.dispatch(sessionActionCreators.updateRecentChat(partner)),
    store.dispatch(chatActionCreators.fetchMessages(partner))
  ]).then(() => {done()})
};

export default ChatContainer;