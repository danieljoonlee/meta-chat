import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from '../../jwt';

export default [
  {
    method: 'POST',
    path: '/api/login',
    handler: (request, reply) => {
      const {username, password} = request.payload;
      User.findOne({username}, (err, user) => {
        if (user) {
          bcrypt.compare(password, user.password, (err, res) => {
            if (res) {
              reply({...user.toJSON(), token: jwt.sign(user.toJSON())});
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