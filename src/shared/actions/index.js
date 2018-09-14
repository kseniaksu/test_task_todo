import axios from 'axios';

export const GET_TODO = 'GET_TODO';
export const ADD_TODO = 'ADD_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const CHANGE_STATUS_TODO = 'CHANGE_STATUS_TODO';

function GetTodoSuccess(todos){
    return {
        type: 'GET_TODO',
        todos: todos    
    }
}

function AddTodoSuccess(todo) {       
    return {
        type: 'ADD_TODO',
        id: todo.id,
        title: todo.title
    }
}

function EditTodoSuccess(id, title) {
    return {
        type: 'EDIT_TODO',
        id: id,
        title: title
    }
}

function DeleteTodoSuccess(id) {
    return {
        type: 'DELETE_TODO',
        id: id
    }
}

function ChangeStatusTodoSuccess(id) {
    return {
        type: 'CHANGE_STATUS_TODO',
        id: id
    }
}

export function GetTodo(title) {  
  return function(dispatch) {
    return axios.get('/api/todos')
        .then(response => response.data)
        .then(todo => {
            dispatch(GetTodoSuccess(todo))
        })
        .catch(error => { 
            throw(error);
        });
    };
}

export function AddTodo(title) {  
  return function(dispatch) {
    return axios.post('/api/todos', {title: title})
        .then(response => response.data)
        .then(todo => {
            dispatch(AddTodoSuccess(todo))
        })
        .catch(error => { 
            throw(error);
        });
    };
}

export function EditTodo(id, title) {  
  return function(dispatch) {
    axios.put(`/api/todos/${id}`, {title: title})
        .then(response => response.data)
        .then(todo => {
            console.log("ACTIONtodo");
            console.log(todo);
            dispatch(EditTodoSuccess(todo.id, todo.title))
        })
        .catch(error => { 
            throw(error);
        });
  };
}

export function DeleteTodo(id) {  
  return function(dispatch) {
    axios.delete(`/api/todos/${id}`)
        .then(response => {
            dispatch(DeleteTodoSuccess(id));
        })
        .catch(error => { 
            throw(error);
        });

  };
}

export function ChangeStatusTodo(id) {  
  return function(dispatch) {
    axios.post(`/api/todos/${id}`)
        .then(response => response.data)
        .then(todo => {
            dispatch(ChangeStatusTodoSuccess(todo.id))
        })
        .catch(error => { 
            throw(error);
        });
  };
}


