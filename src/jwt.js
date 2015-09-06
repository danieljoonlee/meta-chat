import jwt from 'jsonwebtoken';

const secret = 'correcthorsebatterystaple';

export default {
  verify(token) {
    return jwt.verify(token, secret);
  },

  sign(data) {
    return jwt.sign(data, secret);
  }
}