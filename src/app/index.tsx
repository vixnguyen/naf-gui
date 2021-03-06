import * as React from 'react';
import { Route, Switch } from 'react-router';
import { App as MainApp } from 'app/containers/app';
import { hot } from 'react-hot-loader';

export const App = hot(module)(() => (
  <Switch>
    <Route path="/" component={MainApp} >
      {/* <IndexRoute component={Home} /> */}
    </Route>
  </Switch>
));
