import {ADD_TODO, EDIT_TODO, DELETE_TODO, CHANGE_STATUS_TODO, GET_TODO} from "../actions"

export default function reducer(state = [], action) {
    switch (action.type) {
    	case GET_TODO: {
			return [...action.todos];
    	}

        case ADD_TODO: {
            const todo = {
            	id: action.id,
			    title: action.title,
			    completed: false
			};
			return [...state, todo];
        }

        case DELETE_TODO: {
        	const index = state.findIndex(todo => todo.id === action.id);            
            return [
            ...state.slice(0, index),
            ...state.slice(index + 1),
            ];        
        }

        case EDIT_TODO: {
            return state.map( todo => {
                if (todo.id !== action.id) {
        		   return todo
        	}
        	return Object.assign({}, todo, {title: action.title});
            });
        }

        case CHANGE_STATUS_TODO: {
            return state.map( todo => {
                if (todo.id !== action.id) {
                    return todo
                }
                return Object.assign({}, todo, {completed: !todo.completed});
            });
        }

        default:
            return state;
    }
}