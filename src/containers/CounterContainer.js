import { Component} from 'react';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import increment from '../actions';

function mapStateToProps(state) {
  return { value: state };
}
function mapDispatchToProps(dispatch) {
  return { increment: () => dispatch(increment()) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
