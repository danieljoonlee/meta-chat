import React from 'react';
import Router from 'react-router';
import {Provider} from 'react-redux';
import Location from 'react-router/lib/Location';
import jwt from 'jsonwebtoken';
import initStore from '../store';
import routes from '../client/components/Routes';
import {LOGIN_SUCCESS} from '../client/actions/constants';

export default {
  method: 'GET',
  path: '/{param*}',
  handler: (request, reply) => {
    const store = initStore();
    setUserSession(store, request.state);

    const location = new Location(request.path || '/');

    Router.run(routes(store), location, (err, initialState) => {
      const AppComponent = (
        <Provider store={store}>
          {() => <Router {...initialState}/>}
        </Provider>
      );

      const reactString = React.renderToString(AppComponent);
      const seededState = JSON.stringify(store.getState());

      reply(template({reactString, seededState}));
    });
  }
};

function setUserSession(store, cookie) {
  try {
    const user = jwt.verify(cookie.token, 'correcthorsebatterystaple');
    store.dispatch({
      type: LOGIN_SUCCESS,
      payload: {...user}
    });
  } catch (err) {}
}

function template(context) {
  const bundleUrl = process.env.NODE_ENV === 'production' ? 'bundle.js' : 'http://localhost:3001/assets/bundle.js';

  return `
    <div id="content">${context.reactString}</div>
    <script>window.REDUX_INITIAL_STATE = ${context.seededState}</script>
    <script src="${bundleUrl}"></script>
  `;
}