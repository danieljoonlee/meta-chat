import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import UserBrowser from '../components/Body/UserBrowser/UserBrowser';
import * as userBrowserActionCreators from '../actions/userBrowser';
import * as chatActionCreators from '../actions/chat';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...userBrowserActionCreators, ...chatActionCreators}, dispatch);
}

const UserBrowserContainer = connect(state => state.userBrowser, mapDispatchToProps)(UserBrowser);

export default UserBrowserContainer;