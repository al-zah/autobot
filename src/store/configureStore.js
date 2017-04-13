import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { middlewareCreator as entitiesMiddlewareCreator } from 'redux-ntities';
import rootReducer from '../reducers';
import transforms from '../api/transforms';

const createStoreWithMiddleware = applyMiddleware(
    entitiesMiddlewareCreator(transforms),
    createLogger(),
)(createStore);

export default function configureStore(initialState: {}): * {
    const store = createStoreWithMiddleware(rootReducer, initialState);

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers'); // eslint-disable-line

            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
