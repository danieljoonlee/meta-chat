import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import UserBrowser from '../components/UserBrowser/UserBrowser';
import * as userBrowserActionCreators from '../actions/userBrowser';
import * as chatActionCreators from '../actions/chat';


function mapDispatchToProps(dispatch) {
  return bindActionCreators({...userBrowserActionCreators, ...chatActionCreators}, dispatch);
}

export default connect(state => state.users, mapDispatchToProps)(UserBrowser);
