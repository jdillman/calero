import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'configureStore';
import registerServiceWorker from 'registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import App from 'components/App';

const store = configureStore();

/* eslint-disable react/jsx-filename-extension */
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
