import {createStore, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import authMiddleware from 'middleware/authMiddleware';
import reducers from 'reducers/index';

const loggerMiddleware = createLogger({
    level: 'info',
    collapsed: true
});

export default function configureStore(state, browserHistory) {
    const reduxRouterMiddleWare = routerMiddleware(browserHistory);
    return createStore(
        reducers,
        state || {},
        compose(
            applyMiddleware(reduxRouterMiddleWare, loggerMiddleware, thunkMiddleware, authMiddleware),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );
}