import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './index.css';
import App from './components/App';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Checkout from './components/Checkout';

import registerServiceWorker from './registerServiceWorker';

const Root = () => (
    <Router>
        <Switch>
            <Route
                exact
                component={App}
                path="/"
            />
            <Route
                component={Signin}
                path="/signin"
            />
            <Route
                component={Signup}
                path="/signup"
            />
            <Route
                component={Checkout}
                path="/checkout"
            />
        </Switch>
    </Router>
);

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();

// hot reload
if (module.hot) {
    module.hot.accept();
}
