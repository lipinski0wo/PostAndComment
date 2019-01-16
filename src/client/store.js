import { createStore, compose, applyMiddleware } from 'redux';
import createSaga from 'redux-saga';

import rootSaga from './sagas';
import reducers from './reducers';
import { getInitialState } from './utils/token';

const sagaMiddleware = createSaga();

const defaultState = getInitialState();

const middleware = [sagaMiddleware];

const redux_dev = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(reducers, defaultState, compose(applyMiddleware(...middleware), redux_dev));

store.subscribe(() => {
    const state = store.getState();
    if (state.general && (state.general.serverFailure || state.general.applicationFailure)) {
        location.reload(true);
    }
});

sagaMiddleware.run(rootSaga);

export default store;