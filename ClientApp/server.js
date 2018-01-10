import * as React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { ConnectedRouter, routerMiddleware, replace} from 'react-router-redux';
import { createMemoryHistory } from 'history';
import { createServerRenderer } from 'aspnet-prerendering';
import { Router, Route, StaticRouter } from 'react-router-dom';
import configureStore from './configureStore';
import {routes} from './routes'


export default createServerRenderer(params => {
    return new Promise((resolve, reject) => {
        let initialState = {};
        const basename = params.baseUrl.substring(0, params.baseUrl.length - 1); // Remove trailing slash
        const urlAfterBasename = params.url.substring(basename.length);
        const middleware = routerMiddleware(createMemoryHistory())
        const store = configureStore(initialState, middleware);

        store.dispatch(replace(urlAfterBasename));
        const routerContext = {};
        const app = (
            <Provider store={store}>
                <StaticRouter basename={basename} context={routerContext} location={params.location.path} children={routes} />
            </Provider> 
        );

        if (routerContext.url) {
            resolve({ redirectUrl: routerContext.url });
            return;
        }

        const html = renderToString(app);

        params.domainTasks.then(() => {
            resolve({
                html: html,
                globals: { initialReduxState: store.getState() }
            });
        },
            reject);
    });

});

