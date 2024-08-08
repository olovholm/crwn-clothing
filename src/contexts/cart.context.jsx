import {createContext, useEffect, useReducer, useState} from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingCardItem = cartItems.find(
        (product) => product.id === productToAdd.id
    )

    if (existingCardItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? {...cartItem, quantity: cartItem.quantity + 1}
                : cartItem)
    }

    return [...cartItems, {...productToAdd, quantity: 1}]
}


const removeCartItem = (cartItems, productToRemove, quantityToRemove = 1) => {

    const removed = cartItems.map((cartItem) =>
        cartItem.id === productToRemove.id ? {...cartItem, quantity: cartItem.quantity - quantityToRemove} : cartItem
    )
    return removed.filter((cartItem) => cartItem.quantity > 0)
}

function clearCartItem(cartItems, cartItemToClear) {
    const removed = cartItems.filter((cartItem) =>
        cartItem.id !== cartItemToClear
    )
    return removed
}


export const CartContext = createContext({
    updateCartVisibility: () => {
    },
    addItemToCart: (productToAdd) => {
    },
    removeFromCart: (productToRemove, amount) => {
    }
})

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const INITAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
}

const cartReducer = (state, action) => {
    const {type, payload} = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                ...payload
            }

        default:
            throw new Error(`unhandled type of ${type} in cartReducer`)
    }

}

export const CartProvider = ({children}) => {

    const [{cartItems, isCartOpen, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITAL_STATE)

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        const newCartTotal = cartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0)
        dispatch({
            type: CART_ACTION_TYPES.SET_CART_ITEMS,
            payload: {cartItems: newCartItems, cartTotal: newCartTotal, cartCount: newCartCount}
        })
    }

    const setIsCartOpen = (bool) => {
        dispatch({
            type: CART_ACTION_TYPES.SET_IS_CART_OPEN,
            payload: {isCartOpen: bool}
        })
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd)
        updateCartItemsReducer(newCartItems)
    }

    const removeFromCart = (productToRemove, amount = 1) => {
        const newCartItems = removeCartItem(cartItems, productToRemove, amount)
        updateCartItemsReducer(newCartItems)
    }


    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear)
        updateCartItemsReducer(newCartItems)
    }

    const value = {isCartOpen, updateCartVisibility: setIsCartOpen, cartItems, addItemToCart, cartCount, removeFromCart, cartTotal}


    return (
        <CartContext.Provider value={value}> {children} </CartContext.Provider>
    )
}

