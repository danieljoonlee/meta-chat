import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Chat from '../components/Body/Chat/Chat';
import * as actionCreators from '../actions/chat';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const ChatContainer = connect(state => state.chat, mapDispatchToProps)(Chat);

ChatContainer.fetchData = store => (routerState, transition, done) => {
  if (store.getState().chat.partner === routerState.params.user2) {
    done();
  } else {
    const {user1, user2} = routerState.params;
    store.dispatch(actionCreators.startChat(user1, user2)).then(()=> done());
  }
};

export default ChatContainer;