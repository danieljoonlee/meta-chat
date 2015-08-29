import User from '../models/User';
import jwt from 'jsonwebtoken';

const secret = 'correcthorsebatterystaple';

export default [
  {
    method: 'POST',
    path: '/api/login',
    handler: (request, reply) => {
      const {username, password} = JSON.parse(request.payload);
      User.findOne({username, password}).lean().exec((err, user) => {
        user ? reply({...user, token: jwt.sign(user, secret)}) : reply({});
      });
    }
  }
];