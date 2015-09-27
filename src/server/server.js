import path from 'path';
import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import socketio from 'socket.io';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import fetch from 'isomorphic-fetch';
import compression from 'compression';
import {DOMAIN} from '../config';
import jwt from '../jwt';

//connect database
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/red');

//start server
const app = express();
const server = http.Server(app);
const port = process.env.PORT || 3000;

server.listen(port, () => console.log(`server listening at ${port}`));

//middleware
app.use(express.static('static'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());

//API routes
import APIController from './APIController';
app.use('/api', APIController);

//UI routes
import UIController from './UIController';
app.use('/', UIController);

//socket io
const io = socketio(server);
const socketIdUsernameMap = {};
const usernameSocketIdMap = {};

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

    fetch(`${DOMAIN}/api/users/recents`, {
      method: 'PUT',
      body: JSON.stringify({user: receiver, partner: msg.speaker}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  });
});
