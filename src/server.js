import path from 'path';
import React from 'react';
import {Server} from 'hapi';
import Inert from 'inert';
import Router from 'react-router';
import routes from './components/Routes';

const server = new Server();
server.connection({port: 3000});
server.start(() => {
  console.log('listening at port 3000');
});

server.register(Inert, ()=>{});

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
    Router.run(routes, path, (Root) => {
      const reactString = React.renderToString(<Root/>);
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

