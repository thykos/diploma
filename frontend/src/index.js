import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './containers/Root/Root';
import client from './helpers/ApiClient';
import store from './reducers/store';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker';

client.setStore(store);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route component={Root}/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
