import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import UserBrowser from '../components/UserBrowser/UserBrowser';
import * as userBrowserActionCreators from '../actions/userBrowser';
import * as chatActionCreators from '../actions/chat';


function mapDispatchToProps(dispatch) {
  return bindActionCreators({...userBrowserActionCreators, ...chatActionCreators}, dispatch);
}

const UserBrowserContainer = connect(state => state.userBrowser, mapDispatchToProps)(UserBrowser);

UserBrowserContainer.fetchData = store => (state, transition, done) => {
  if (store.getState().userBrowser.users.length > 0) {
    done();
  } else {
    store.dispatch(userBrowserActionCreators.fetchUsers()).then(()=> done());
  }
};

export default UserBrowserContainer;