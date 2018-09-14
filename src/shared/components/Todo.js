import React from 'react';
import ReactDom from 'react-dom';

import Checkbox from "./Checkbox";
import Button from "./Button";

class Todo extends React.Component {
    constructor(props){
        super();
        this.state = {
            editing: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps){
        // console.log("componentWillReceiveProps");
        // console.log("nextProps", nextProps);
    }
    componentWillUpdate(nextProps, nextState){
        // console.log("componentWillUpdate");
        // console.log("nextProps", nextProps);
        // console.log("nextState", nextState);
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log("shouldComponentUpdate");
        // console.log("nextProps", nextProps);
        // console.log("nextState", nextState);
        return true
    }
    componentDidUpdate(prevProps, prevState){
        // console.log("componentDidUpdate");
        // console.log("prevProps", prevProps);
        // console.log("prevState", prevState);

        if (this.state.editing) {
            this.refs.title.focus();
            this.refs.title.select();
        }
    }
    componentWillUnmount(){
        console.log("componentWillUnmount");
    }
    handleSubmit(event) {
        event.preventDefault();
        let title = this.refs.title.value;
        this.props.onEdit(this.props.id, title);
        this.setState({editing: false});
    }
    renderDisplay() {
        return(
            <div className={`todo${this.props.completed ? ' completed' : ''}`}>
                <Checkbox checked={this.props.completed} onChange={() => this.props.onStatusChange(this.props.id)}/>
                <span className="todo-title">{this.props.title}</span>
                <Button className="edit icon" icon="edit" onClick={() => this.setState({editing: true})}/>
                <Button icon="delete" className="delete icon" onClick={() => this.props.onDelete(this.props.id)}/>
            </div>
        );
    }
    renderForm() {
        return(
            <form className="todo-edit-form" onSubmit={this.handleSubmit}>
                <input type="text" ref="title" defaultValue={this.props.title}/>
                <Button className="save icon" icon="save" type="submit"/>
            </form>
        );
    }
    render(){
        return ( this.state.editing ? this.renderForm() : this.renderDisplay())
    }
}
// Todo.propTypes = {
//     title: React.PropTypes.string.isRequired,
//     completed: React.PropTypes.bool.isRequired,
//     onStatusChange: React.PropTypes.func.isRequired,
//     onDelete: React.PropTypes.func,
//     onEdit: React.PropTypes.func,
// };

export default Todo;