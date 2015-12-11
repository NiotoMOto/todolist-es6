import Dispatcher from '../dispatcher/index';

const TodoActions = {
  init(users) {
    Dispatcher.dispatch({
      users,
      eventName: 'init-users'
    });
  },

  add(message) {
    Dispatcher.dispatch({
      eventName: 'new-user-item',
      user: {
        message,
        active: true
      }
    });
  },
};

export default UserActions;
