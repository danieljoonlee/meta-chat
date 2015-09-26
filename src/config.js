export default {
  DOMAIN: process.env.DOMAIN || process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3000'
};