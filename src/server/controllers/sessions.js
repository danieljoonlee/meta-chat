import User from '../models/User';
import jwt from 'jsonwebtoken';

const secret = 'correcthorsebatterystaple';

export default (server) => {
  server.route({
    method: 'POST',
    path: '/api/login',
    handler: (request, reply) => {
      const {username, password} = JSON.parse(request.payload);
      User.findOne({username, password}, (err, user) => {
        user ? reply(jwt.sign(user, secret)) : reply(null);
      });
    }
  });
}
