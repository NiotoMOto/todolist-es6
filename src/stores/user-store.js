import {EventEmitter} from 'events';
import Dispatcher from '../dispatcher/index';

const UserStore = Object.assign({}, EventEmitter.prototype, {
  users: [],

  init(users) {
    this.users = users;
  },

  getAll() {
    return fetch('/api/v1/Users', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(!res.status.toString().startsWith('2')) {
        this.emit('error', res);
      }
      console.log(res.json());
      return res;
    });
  },

  add(user) {
    this.users.push(user);

    return fetch('/api/v1/Users', {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => {
      if(!res.status.toString().startsWith('2')) {
        this.emit('error', res);
      }
      return res;
    });
  },

});


Dispatcher.register(payload => {
  switch(payload.eventName) {
    case 'init-users':
      UserStore.init(payload.users);
      UserStore.emit('change');
      break;
    case 'new-user-item':
      UserStore.add(payload.user);
      UserStore.emit('change');
      break;
  }

  return true;
});

export default UserStore;
