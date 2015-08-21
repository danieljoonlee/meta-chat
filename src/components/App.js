import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import MainContainer from '../containers/MainContainer';
import reducer from '../reducers';

let store = createStore(reducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {() => <MainContainer/>}
      </Provider>
    );
  }
}
