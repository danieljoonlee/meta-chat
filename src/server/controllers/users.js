import {Router} from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from '../../jwt';

const router = Router();

router.get('/', (req, res) => {
  User.find({}, {recentChats: 0}, (err, users) => {
    res.send(users);
  });
});

router.get('/:username', (req, res) => {
  let user;

  try {
    user = jwt.verify(req.headers.authorization);
  } catch (err) {}

  if (user && user.username === req.params.username) {
    User.findById(user._id, (err, user) => res.send(user));
  } else {
    User.findOne({username: req.params.username}, {recentChats: 0}, (err, user) => {
      res.send(user);
    });
  }
});

router.post('/', (req, res) => {
  bcrypt.hash(req.body.password, 8, (err, hash) => {
    const userData = {...req.body, password: hash};
    const user = new User(userData);
    user.save((err, user) => {
      res.send({...user.toJSON(), token: jwt.sign(user.toJSON())});
    });
  });
});

router.put('/recents', (req, res) => {
  User.findUserAndPushRecentChat(req.body, (err, user) => res.send(user.recentChats));
});

export default router;