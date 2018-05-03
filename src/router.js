import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Home from './routes/Home';
import Register from './routes/Register';
import Article from './routes/Article';
import Profile from './routes/Profile';
import Login from './routes/Login';
import Settings from './routes/Settings';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/settings" exact component={Settings} />
        <Route path="/article/:slug" exact component={Article} />
        <Route path="/tag/:tag" exact component={Home} />
        <Route path="/feed" exact component={Home} />
        <Route path="/@:username" exact component={Profile} />
        <Route path="/@:username/favorites" exact component={Profile} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
