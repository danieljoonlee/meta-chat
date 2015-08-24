import {connect} from 'react-redux';
import UserBrowser from '../components/UserBrowser/UserBrowser';
import {requestUsers} from '../actions/userBrowser';

function mapDispatchToProps(dispatch) {
  return {
    requestUsers: () => dispatch(requestUsers())
  }
}

export default connect(state => state, mapDispatchToProps)(UserBrowser);
