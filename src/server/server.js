import path from 'path';
import React from 'react';
import {Server} from 'hapi';
import Inert from 'inert';
import Router from 'react-router';
import Location from 'react-router/lib/Location';
import routes from '../client/components/Routes';
import universalRouter from '../universalRouter';
import mongoose from 'mongoose';

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


//////////////////////
//      ROUTES      //
//////////////////////
import usersController from './controllers/users';
import sessionsController from './controllers/sessions';

usersController(server);
sessionsController(server);

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
    const path = request.path || '/';
    const location = new Location(path);
    universalRouter(location).then((component) => {
      const reactString = React.renderToString(component);
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

