import path from 'path';
import {Server} from 'hapi';
import Inert from 'inert';
import mongoose from 'mongoose';
import ioInit from 'socket.io';
import fetch from 'isomorphic-fetch';
import jwt from '../jwt';

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

//socket io
const socketIdUsernameMap = {};
const usernameSocketIdMap = {};
const io = ioInit(server.listener);
io.on('connection', socket => {
  socket.on('creds', token => {
    try {
      const user = jwt.verify(token);
      usernameSocketIdMap[user.username] = socket.id;
      socketIdUsernameMap[socket.id] = user.username;
    } catch (err) {}
  });

  socket.on('disconnect', () => {
    const username = socketIdUsernameMap[socket.id];
    if (username) {
      delete usernameSocketIdMap[username];
      delete socketIdUsernameMap[socket.id];
    }
  });

  socket.on('message', (msg) => {
    const receiver = msg.user1 === msg.speaker ? msg.user2 : msg.user1;
    const receiverSocketId = usernameSocketIdMap[receiver];
    socket.broadcast.to(receiverSocketId).emit('message', msg);

    fetch('http://localhost:3000/api/users/recents', {
      method: 'PUT',
      body: JSON.stringify({user: receiver, partner: msg.speaker}), // add recent chat to par
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  });
});

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