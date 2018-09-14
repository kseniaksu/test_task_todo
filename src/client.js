import React      from 'react';
import ReactDOM   from 'react-dom';
import App        from 'shared/App';
import { Provider } from 'react-redux';
import configureStore from './shared/store/configureStore';
const initialState = window.REDUX_INITIAL_STATE || {};

console.log("initialState");
console.log(initialState);

const store = configureStore(initialState);

console.log("store.getState()");
console.log(store.getState());


const component = (
<Provider store={store}>
    <App/>
</Provider>      
);

ReactDOM.hydrate(component, document.getElementById('react-view'));