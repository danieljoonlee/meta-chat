import io from 'socket.io-client';
import cookie from 'js-cookie';
import {receiveMessage} from './actions/chat';
import {refreshCurrentUser} from './actions/session';

export default {
  init(store, url='http://localhost:3000') {
    this.store = store;
    this.url = url;
    this.login();
  },

  login() {
    if (cookie.get('token')) {
      this._reconnect();

      this.socket.emit('creds', cookie.get('token'));
      this.socket.on('message', message => {
        this.store.dispatch(receiveMessage(message));
        this.store.dispatch(refreshCurrentUser())
      });
    }
  },

  logout() {
    if (this.socket) { this.socket.disconnect(); }
  },

  _reconnect() {
    if (this.socket) { this.logout(); }
    this.socket = io(this.url, {multiplex: false});
  }
}