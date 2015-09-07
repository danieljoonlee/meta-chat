import Message from '../models/Message';
import jwt from '../../jwt';

export default [
  {
    method: 'GET',
    path: '/api/messages/{user*2}',
    handler: (request, reply) => {
      const [user1, user2] = request.params.user.split('/').map(decodeURIComponent);
      Message.findByUsers(user1.toLowerCase(), user2.toLowerCase(), (err, messages) => reply(messages));
    }
  },
  {
    method: 'POST',
    path: '/api/messages',
    handler: (request, reply) => {
      try {
        const user = jwt.verify(request.state.token);
        const [user1, user2] = [user.username, request.payload.partner].sort();
        const newMessage = {
          user1,
          user2,
          speaker: user.username,
          content: request.payload.content
        };
        Message.create(newMessage, (err, message) => reply(message));
      } catch (err) {reply(null);}
    }
  }
];