import User from '../models/User';

export default function(server) {
  server.route({
    method: 'POST',
    path: '/api/users',
    handler: (request, reply) => {
      const user = new User(request.payload);
      user.save((err, user) => { reply(user); });
    }
  });
}
