import path from 'path';
import {Server} from 'hapi';
import Inert from 'inert';
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

//API routes
import usersController from './controllers/users';
import sessionsController from './controllers/sessions';
import messagesController from './controllers/messages';

server.route(usersController);
server.route(sessionsController);
server.route(messagesController);

//client-side routes
import UIController from './UIController';
server.route(UIController);

server.route({
  method: 'GET',
  path: '/bundle.js',
  handler: (request, reply) => {
    reply.file(path.join(__dirname, '../../dist/bundle.js'));
  }
});

// serve static files at /static
server.route({
  method: 'GET',
  path: '/static/{param*}',
  handler: (request, reply) => {
    reply.file(path.join(__dirname, '../../', request.path));
  }
});

server.route({
  method: 'GET',
  path: '/favicon.ico',
  handler: (request, reply) => {
    reply.file(path.join(__dirname, '../../static/favicon.ico'));
  }
});

