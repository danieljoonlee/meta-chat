import Message from '../models/Message';

export default [
  {
    method: 'GET',
    path: '/api/messages/{user*2}',
    handler: (request, reply) => {
      const [user1, user2] = request.params.user.split('/').map(decodeURIComponent);
      Message.findByUsers(user1.toLowerCase(), user2.toLowerCase(), (err, messages) => reply(messages));
    }
  }
];