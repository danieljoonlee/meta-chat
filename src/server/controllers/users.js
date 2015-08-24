import User from '../models/User';

export default (server) => {
  server.route({
    method: 'POST',
    path: '/api/users',
    handler: (request, reply) => {
      const user = new User(request.payload);
      user.save((err, user) => { reply(user); });
    }
  });

  server.route({
    method: 'GET',
    path: '/api/users',
    handler: (request, reply) => {
      User.find((err, users) => {
        reply(users);
      });
    }
  });
}
