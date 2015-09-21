import React from 'react';
import { RoutingContext, match } from 'react-router';
import {Provider} from 'react-redux';
import createLocation from 'history/lib/createLocation';
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

    const location = createLocation(request.path || '/');

    match({routes: routes(store), location}, (err, redirectLocation, renderProps) => {
      try {
        const AppComponent = (
          <Provider store={store}>
            {() => <RoutingContext {...renderProps}/>}
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
      payload: {...user.toJSON(), token: cookie.token}
    });
  } catch (err) {}
}

function template(context) {
  const bundleUrl = process.env.NODE_ENV === 'production' ? '/bundle.js' : 'http://localhost:3001/assets/bundle.js';

  return `
    <style>
      .js-recent-unread {
        background-color: pink;
      }
      .js-nested-messages {
        background-color: yellow;
      }
    </style>
    <div id="content">${context.reactString}</div>
    <script>window.REDUX_INITIAL_STATE = ${context.seededState}</script>
    <script src="${bundleUrl}"></script>
  `;
}