import {Router} from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';
import jwt from '../../jwt';

const router = Router();

router.post('/', (req, res) => {
  const {username, password} = req.body;
  User.findOne({username}, (err, user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          res.send({...user.toJSON(), token: jwt.sign(user.toJSON())});
        } else {
          res.send(null);
        }
      });
    } else {
      res.send(null);
    }
  });
});

export default router;