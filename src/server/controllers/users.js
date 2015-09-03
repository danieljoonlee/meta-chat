import User from '../models/User';
import bcrypt from 'bcrypt';

export default [
  {
    method: 'POST',
    path: '/api/users',
    handler: (request, reply) => {
      bcrypt.hash(request.payload.password, 8, (err, hash) => {
        const userData = {...request.payload, password: hash};
        const user = new User(userData);
        user.save((err, user) => {reply(user);});
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
  }
];
