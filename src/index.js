import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, Redirect } from 'react-router';
import App from './App';
import './index.css';
import Login from './Login';
import NotFound from './NotFound';
import CardList from './CardList';
import { store, history } from './store/global';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/index" component={App}>
        <IndexRoute component={CardList}/>
        <Route path="/login" component={Login}/>
        <Redirect from='*' to='/index' />
      </Route>
      <Redirect from='*' to='/index' />
    </Router>
  </Provider>,
  document.getElementById('root')
);
