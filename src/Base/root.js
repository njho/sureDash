import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import Routes from './routes';

import store from './store';
import history from './history';

class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Routes/>
                </Router>
            </Provider>
        );
    }
}

export default Root;
