import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';

import App from 'App';
import store from 'store';
import setAuthorizationToken from 'lib/setAuthorizationToken';

setAuthorizationToken(localStorage.uhihiToken);

ReactDOM.render(
    <CookiesProvider>
        <Provider store={store}>
            <App />
        </Provider>
    </CookiesProvider>,
    document.getElementById('root')
);
