import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Chat from '../components/Chat/Chat';
import * as actionCreators from '../actions/chat';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(state => state.chat, mapDispatchToProps)(Chat);
