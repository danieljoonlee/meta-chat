import {Router} from 'express';
import Message from '../models/Message';
import jwt from '../../jwt';

const router = Router();

router.get('/:partner', (req, res) => {
  try {
    const user = jwt.verify(req.headers.authorization);
    const users = [req.params.partner, user.username]
      .map(name => name.toLowerCase())
      .sort();
    Message.findByUsers(users[0], users[1], (err, messages) => res.send(messages));
  } catch (err) {res.send(null)}
});

router.post('/', (req, res) => {
  try {
    const user = jwt.verify(req.headers.authorization);
    const [user1, user2] = [user.username, req.body.partner].sort();
    const newMessage = {
      user1,
      user2,
      speaker: user.username,
      parent: req.body.parent,
      content: req.body.content
    };
    Message.create(newMessage, (err, message) => res.send(message));
  } catch (err) {res.send(null);}
});

export default router;