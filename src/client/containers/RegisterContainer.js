import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Register from '../components/Body/Register/Register';
import * as actionCreators from '../actions/register';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(() => {return {}}, mapDispatchToProps)(Register);