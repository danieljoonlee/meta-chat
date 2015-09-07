import React from 'react';
import Router from 'react-router';
import {Provider} from 'react-redux';
import Location from 'react-router/lib/Location';
import jwt from '../jwt';
import initStore from '../store';
import routes from '../client/components/Routes';
import {LOGIN_SUCCESS} from '../client/actions/constants';
import User from './models/User';

export default {
  method: 'GET',
  path: '/{param*}',
  handler: async (request, reply) => {
    const store = initStore();
    await setUserSession(store, request.state);

    const location = new Location(request.path || '/');

    Router.run(routes(store), location, (err, initialState) => {
      try {
        const AppComponent = (
          <Provider store={store}>
            {() => <Router {...initialState}/>}
          </Provider>
        );

        const reactString = React.renderToString(AppComponent);
        const seededState = JSON.stringify(store.getState());

        reply(template({reactString, seededState}));
      } catch (err) {
        console.log(err, err.stack);
      }
    });
  }
};

async function setUserSession(store, cookie) {
  try {
    const jwtUser = jwt.verify(cookie.token);
    var user = await User.findById(jwtUser._id);
    store.dispatch({
      type: LOGIN_SUCCESS,
      payload: {...user.toJSON()}
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