import React, {Component} from 'react';

import TodoList from '../components/todos/todo-list';
import Layout from '../components/layout';
import UserStore from '../stores/user-store';

export default class Home extends Component {

  render() {
    UserStore.init(this.props.elements);
    UserStore.getAll().then( data => {
      data.json();
      console.log(data);
    });

    return (
      <Layout title={this.props.title}>
        <TodoList elements={this.props.elements} />
      </Layout>
    );
  }
}
