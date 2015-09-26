import Message from '../models/Message';
import jwt from '../../jwt';

export default [
  {
    method: 'GET',
    path: '/api/messages/{partner}',
    handler: (request, reply) => {
      try {
        const user = jwt.verify(request.headers.authorization);
        const users = [request.params.partner, user.username]
          .map(name => name.toLowerCase())
          .sort();
        Message.findByUsers(users[0], users[1], (err, messages) => reply(messages));
      } catch (err) {reply(null)}
    }
  },
  {
    method: 'POST',
    path: '/api/messages',
    handler: (request, reply) => {
      try {
        const user = jwt.verify(request.headers.authorization);
        const [user1, user2] = [user.username, request.payload.partner].sort();
        const newMessage = {
          user1,
          user2,
          speaker: user.username,
          parent: request.payload.parent,
          content: request.payload.content
        };
        Message.create(newMessage, (err, message) => reply(message));
      } catch (err) {reply(null);}
    }
  }
];