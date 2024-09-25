import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import './categories.styles.scss'
import {CategoriesProvider} from "./contexts/categories.contexts";
import './index.scss'
import {CartProvider} from "./contexts/cart.context";
import {Provider} from "react-redux";
import {store} from "./store/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                    <CategoriesProvider>
                        <CartProvider>
                            <App/>
                        </CartProvider>
                    </CategoriesProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

