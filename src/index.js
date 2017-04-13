// @flow
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Layout from './layout';

const MOUNT_NODE = document.getElementById('root'); // eslint-disable-line

const store = configureStore({});

render(
    <Provider store={store}>
        <Layout />
    </Provider>,
    MOUNT_NODE,
);

if (module.hot) {
    module.hot.accept(); // eslint-disable-line
}
