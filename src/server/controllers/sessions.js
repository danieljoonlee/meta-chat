import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secret = 'correcthorsebatterystaple';

export default [
  {
    method: 'POST',
    path: '/api/login',
    handler: (request, reply) => {
      const {username, password} = JSON.parse(request.payload);
      User.findOne({username}).lean().exec((err, user) => {
        if (user) {
          bcrypt.compare(password, user.password, (err, res) => {
            if (res) {
              delete user.password;
              reply({...user, token: jwt.sign(user, secret)});
            } else {
              reply(null);
            }
          });
        } else {
          reply(null);
        }
      });
    }
  }
];
