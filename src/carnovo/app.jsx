import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import configureStore from 'store/configureStore';
import routes from 'routes';
import {loadState, saveState} from 'store/localstorage';
import throttle from 'lodash/throttle';

require('theme/main.scss');

const persistedState = loadState();
export const history = browserHistory;
export const store = configureStore(persistedState || {}, history);

store.subscribe(throttle(() => {
    saveState({
        auth: store.getState().auth,
        carRegister: store.getState().carRegister
    });
}, 1000));

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            {routes()}
        </Router>
    </Provider>,
    document.getElementById('root')
);
