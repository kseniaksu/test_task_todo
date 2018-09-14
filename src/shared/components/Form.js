import React from 'react';
import ReactDom from 'react-dom';

import Button from "./Button";

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        let title = this.state.title;
        if (title) {
            this.props.onAdd(title);
            this.setState({title: ""});
        }
    }
    handleChange(event) {
        let title = event.target.value;
        this.setState({title: title})
    }

    render() {
        return (
            <form className="todo-form" onSubmit={this.handleSubmit}>
                <input type="text" ref="title" value={this.state.title} placeholder="New Task" onChange={this.handleChange}/>
                <Button type="submmit" onClick={this.handleSubmit}>Add Task</Button>
            </form>
        );
    }
}

// Form.PropTypes = {
//     onAdd: React.PropTypes.func.isRequired
// }

export default Form;