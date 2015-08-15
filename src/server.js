import path from 'path';
import React from 'react';
import {Server} from 'hapi';
import Inert from 'inert';
import Router from 'react-router';
import routes from './components/Routes';

const server = new Server();
server.connection({port: 3000});
server.start(() => {
  console.log('listening');
});

server.register(Inert, function () {});

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
    var path = request.path || '/';
    Router.run(routes, path, (Root) => {
      var reactString = React.renderToString(<Root/>);
      var html = `
        <div id="content">${reactString}</div>
        <script src="bundle.js"></script>
      `;
      reply(html);
    });
  }
});
