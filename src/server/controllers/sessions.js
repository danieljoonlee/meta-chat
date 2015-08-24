import User from '../models/User';
import jwt from 'jsonwebtoken';

const secret = 'correcthorsebatterystaple';

export default (server) => {
  server.route({
    method: 'POST',
    path: '/api/login',
    handler: (request, reply) => {
      const username = request.payload.username;
      const password = request.payload.password;

      User.findOne({username, password}, (err, user) => {
        console.log(user);
        user ? reply(jwt.sign(user, secret)) : reply(null);
      });
    }
  });
}
