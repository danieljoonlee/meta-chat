import path from 'path';
import React from 'react';
import {Server} from 'hapi';
import Inert from 'inert';
import mongoose from 'mongoose';
import Router from 'react-router';
import {Provider} from 'react-redux';
import store from '../store';
import Location from 'react-router/lib/Location';
import routes from '../client/components/Routes';

//connect database
mongoose.connect('mongodb://localhost/red');

//start server
const server = new Server();
server.connection({port: 3000});
server.start(() => {
  console.log('listening at port 3000');
});

//static files plugin
server.register(Inert, ()=>{});

//API routes
import usersController from './controllers/users';
import sessionsController from './controllers/sessions';
import messagesController from './controllers/messages';

server.route(usersController);
server.route(sessionsController);
server.route(messagesController);

//client-side routes
server.route({
  method: 'GET',
  path: '/bundle.js',
  handler: (request, reply) => {
    reply.file(path.join(__dirname, '../dist/bundle.js'));
  }
});

// serve static files at /static
server.route({
  method: 'GET',
  path: '/static/{param*}',
  handler: (request, reply) => {
    reply.file(path.join(__dirname, '../', request.path));
  }
});

// serve from react router
server.route({
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
});

server.route({
  method: 'GET',
  path: '/favicon.ico',
  handler: (request, reply) => {
    reply.file(path.join(__dirname, '../static/favicon.ico'));
  }
});

