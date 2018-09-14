import express  from 'express';
import React    from 'react';
import ReactDom from 'react-dom/server';
import App      from 'shared/App';
import bodyParser from 'body-parser';
import { Provider } from 'react-redux';
import configureStore from './shared/store/configureStore';
import app  from './api';
 
let todos = [];

app.use((req, res) => {  
  const store = configureStore(todos);
  const state = store.getState();
  const componentHTML = ReactDom.renderToString(
    <Provider store={store}>
      <App initialData={todos}/>
    </Provider>
  );
  return res.end(renderHTML(componentHTML, state));
});

const assetUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:8080' : '/';
const initialState = todos;

function renderHTML(componentHTML, initialState) {
  return `
    <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Hello React</title>
          
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <link rel="stylesheet" href="${assetUrl}/public/assets/styles.css">
        <script type="application/javascript">
            window.REDUX_INITIAL_STATE = ${JSON.stringify(initialState)};
        </script>
      </head>
      <body>
        <div id="react-view">${componentHTML}</div>
        <script type="application/javascript" src="${assetUrl}/public/assets/bundle.js"></script>
      </body>
    </html>
  `;
}

// <link rel="stylesheet" href="${assetUrl}/public/assets/styles.css">

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on: ${PORT}`);
});










