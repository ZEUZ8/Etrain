import React from "react"
import ReactDom from "react-dom";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import App from "./App"

const root = ReactDom.createRoot(document.getElementById('root'));

let persistor = persistStore(store)

root.render(
    <BrowserRouter>
        <React.StrictMode>
            <Provider store={store}>
                <PersistGate persistor={persistor}></PersistGate>
                <App/>
            </Provider>
        </React.StrictMode>
    </BrowserRouter>
)

