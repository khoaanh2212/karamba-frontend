import {createStore, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import authMiddleware from 'middleware/Auth.middleware';
import carMiddleware from 'middleware/Car.middleware';
import registerMiddleware from 'middleware/Register.middleware';
import clientMiddleware from 'middleware/Client.middleware';
import opportunitiesMiddleware from 'middleware/Opportunities.middleware';
import messageMiddleware from 'middleware/Message.middleware';
import reducers from 'reducers';

const loggerMiddleware = createLogger({
    level: 'info',
    collapsed: true,
    predicate: (getState, action) => {
        return !(action.type && action.type.indexOf('redux-form') >= 0);
    }
});

export default function configureStore(state, browserHistory) {
    const reduxRouterMiddleWare = routerMiddleware(browserHistory);
    return createStore(
        reducers,
        state || {},
        compose(
            applyMiddleware(reduxRouterMiddleWare, loggerMiddleware, thunkMiddleware, authMiddleware, registerMiddleware, carMiddleware, clientMiddleware, opportunitiesMiddleware, messageMiddleware),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );
}
