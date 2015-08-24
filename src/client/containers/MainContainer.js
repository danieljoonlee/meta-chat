import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Main from '../components/Main';
import login from '../actions/auth';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({login}, dispatch);
}

export default connect(state => state, mapDispatchToProps)(Main);
