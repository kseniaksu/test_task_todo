import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActions from './actions';
import Header from "./components/Header";
import Todo from "./components/Todo";
import Form from "./components/Form";
import axios from 'axios';
import  './style.css';

class App extends React.Component {
    constructor(props){
        super();
    }
    componentDidMount(){
        this.props.todoActions.GetTodo();
    }
    render() {
        return (
            <main>
                <Header subtitle={'Crello test'} title={'Todo List'} todos={this.props.todos}/>
                <section>
                <div className="todo-list">
                    {
                        this.props.todos.map(todo =>
                            <Todo
                                key={todo.id}
                                id={todo.id}
                                title={todo.title}
                                completed={todo.completed}
                                onStatusChange={this.props.todoActions.ChangeStatusTodo}
                                onDelete={this.props.todoActions.DeleteTodo}
                                onEdit={this.props.todoActions.EditTodo}
                            />)
                        }
                    </div>
                    <Form onAdd={this.props.todoActions.AddTodo}/>
                </section>
            </main>
        );
    }
}

function mapStateToProps(state) {
  return {
        todos: state,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        todoActions: bindActionCreators(todoActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


// App.propTypes = {
//     title: React.PropTypes.string.isRequired,
//     initialData: React.PropTypes.arrayOf(React.PropTypes.shape( {
//         id: React.PropTypes.number.isRequired,
//         title: React.PropTypes.string.isRequired,
//         completed: React.PropTypes.bool.isRequired
//     })).isRequired
// };
// App.defaultProps = {
//     title: "Todo List"
// }
