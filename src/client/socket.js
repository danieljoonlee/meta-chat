import io from 'socket.io-client';
import cookie from 'js-cookie';
import {receiveMessage} from './actions/chat';
import {refreshCurrentUser} from './actions/session';
import {DOMAIN} from '../config';

export default {
  init(store, url=DOMAIN) {
    this.store = store;
    this.url = url;
    this.login();
  },

  login() {
    if (cookie.get('token')) {
      this._reconnect();
      this.socket.emit('creds', cookie.get('token'));
      this._setEventListeners(this.socket, this.store);
    }
  },

  logout() {
    if (this.socket) { this.socket.disconnect(); }
  },

  _reconnect() {
    if (this.socket) { this.logout(); }
    this.socket = io(this.url, {multiplex: false});
  },

  _setEventListeners(socket, store) {
    socket.on('message', message => {
      const currentUser = store.getState().session.currentUser.username;

      if (message.speaker === store.getState().chat.partner) {
        store.dispatch(receiveMessage({...message, unread: false}));
        store.dispatch(updateRecentChat({user: currentUser, partner: message.speaker, unread: false}));
      } else {
        store.dispatch(refreshCurrentUser(currentUser))
      }
    });
  }
}