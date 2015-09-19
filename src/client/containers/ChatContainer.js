import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Chat from '../components/Body/Chat/Chat';
import * as chatActionCreators from '../actions/chat';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(chatActionCreators, dispatch);
}

const ChatContainer = connect(state => state.chat, mapDispatchToProps)(Chat);

export default ChatContainer;