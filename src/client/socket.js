import io from 'socket.io-client';
import cookie from 'js-cookie';
import {receiveMessage} from './actions/chat';
import {refreshCurrentUser} from './actions/session';

//export default io('http://localhost:3000');

export default {
  init(store) {
    if (store) {this.store = store;}

    this.socket && this.socket.disconnect();
    this.socket = io('http://localhost:3000', {multiplex: false});

    if (cookie.get('token')) {
      this.socket.emit('creds', cookie.get('token'));
      this.socket.on('message', message => {
        this.store.dispatch(receiveMessage(message));
        this.store.dispatch(refreshCurrentUser())
      });
    }
  },

  disconnect() {
    this.socket && this.socket.disconnect();
  }
}