import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const Root = () => {
    <Router>
        <Switch>
            <Route

            />
        </Switch>
    </Router>
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
