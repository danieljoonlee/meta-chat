import React from 'react';
import { RoutingContext, match } from 'react-router';
import {Provider} from 'react-redux';
import createLocation from 'history/lib/createLocation';
import {Router} from 'express';
import jwt from '../jwt';
import initStore from '../store';
import routes from '../client/components/Routes';
import {LOGIN_SUCCESS} from '../client/actions/constants';
import User from './models/User';

const router = Router();

router.get('/:params?*', async (req, res) => {
  const store = initStore();
  const location = createLocation(req.path || '/');

  await setUserSession(store, req.cookies.token);

  match({routes: routes(store), location}, (err, redirectLocation, renderProps) => {
    try {
      const AppComponent = (
        <Provider store={store}>
          {() => <RoutingContext {...renderProps}/>}
        </Provider>
      );

      const reactString = React.renderToString(AppComponent);
      const seededState = JSON.stringify(store.getState());

      res.send(template({reactString, seededState}));
    } catch (err) {
      console.log(err, err.stack);
    }
  });
});

async function setUserSession(store, token) {
  try {
    const jwtUser = jwt.verify(token);
    var user = await User.findById(jwtUser._id);
    store.dispatch({
      type: LOGIN_SUCCESS,
      payload: {...user.toJSON(), token}
    });
  } catch (err) {}
}

function template(context) {
  const bundleUrl = process.env.NODE_ENV === 'production' ? '/bundle.js' : 'http://localhost:3001/bundle.js';

  return `
    <style>
      .js-recent-unread {
        background-color: pink;
      }
      .js-has-nested-messages {
        background-color: yellow;
      }
      .js-message {
        cursor: pointer;
      }
    </style>
    <div id="content">${context.reactString}</div>
    <script>window.REDUX_INITIAL_STATE = ${context.seededState}</script>
    <script src="${bundleUrl}"></script>
  `;
}

export default router;