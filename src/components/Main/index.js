import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from '../../components/App';
import about from '../../components/App/about';


const Main = props => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/about" component={about} />
        </Switch>
    </BrowserRouter>

)

export default Main;