import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import UserBrowser from '../components/UserBrowser/UserBrowser';
import * as actionCreators from '../actions/userBrowser';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(state => state, mapDispatchToProps)(UserBrowser);
