import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './pages/Dashboard';
import about from './pages/About';

/**
 * **Main Class**
 */
const Main = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/about" component={about} />
    </Switch>
  </BrowserRouter>
);

export default Main;
