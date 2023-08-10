import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Reducers from "./redux/reducers";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {BrowserRouter} from "react-router-dom";
import {Toaster} from "react-hot-toast";

const store = configureStore({
    reducer: Reducers,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App/>
                <Toaster />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();
