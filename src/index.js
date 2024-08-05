import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import './categories.styles.scss'
import {UserProvider} from "./contexts/user.context";
import {CategoriesProvider} from "./contexts/categories.contexts";
import './index.scss'
import {CartProvider} from "./contexts/cart.context";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <UserProvider>
                <CategoriesProvider>
                    <CartProvider>
                        <App/>
                    </CartProvider>
                </CategoriesProvider>
            </UserProvider>
        </BrowserRouter>
    </React.StrictMode>
);

