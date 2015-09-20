import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from '../../jwt';

export default [
  {
    method: 'POST',
    path: '/api/users',
    handler: (request, reply) => {
      bcrypt.hash(request.payload.password, 8, (err, hash) => {
        const userData = {...request.payload, password: hash};
        const user = new User(userData);
        user.save((err, user) => {
          reply({user: user.toJSON(), token: jwt.sign(user.toJSON())});
        });
      });
    }
  },

  {
    method: 'GET',
    path: '/api/users',
    handler: (request, reply) => {
      User.find((err, users) => {
        reply(users);
      });
    }
  },

  {
    method: 'GET',
    path: '/api/user/{username?}',
    handler: (request, reply) => {
      if (!request.params.username) {
        try {
          const user = jwt.verify(request.state.token);
          User.findById(user._id, (err, user) => {
            reply(user);
          });
        } catch (err) {reply(null);}
      } else {
        User.findOne({username: request.params.username}, (err, user) => {
          reply(user);
        });
      }
    }
  },

  {
    method: 'PUT',
    path: '/api/users/recents',
    handler: (request, reply) => {
      User.findUserAndPushRecentChat(request.payload, (err, user) => {reply(user.recentChats)});
    }
  }
];