import React from 'react';
import Router from 'react-router';
import {Provider} from 'react-redux';
import Location from 'react-router/lib/Location';
import store from '../../store';
import routes from '../../client/components/Routes';

export default {
  method: 'GET',
  path: '/{param*}',
  handler: (request, reply) => {
    const location = new Location(request.path || '/');

    Router.run(routes, location, (err, initialState) => {
      const AppComponent = (
        <Provider store={store}>
          {() => <Router {...initialState}/>}
        </Provider>
      );
      const reactString = React.renderToString(AppComponent);
      const bundleUrl = process.env.NODE_ENV === 'production' ? 'bundle.js' : 'http://localhost:3001/assets/bundle.js';
      const html = `
        <div id="content">${reactString}</div>
        <script src="${bundleUrl}"></script>
      `;
      reply(html);
    });
  }
};