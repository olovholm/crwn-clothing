import {createContext, useEffect, useState} from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingCardItem = cartItems.find(
        (product) => product.id === productToAdd.id
    )

    if(existingCardItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? {...cartItem, quantity: cartItem.quantity + 1}
        : cartItem)
    }

    return [...cartItems, {...productToAdd, quantity: 1 }]
}


const removeCartItem = (cartItems, productToRemove, quantityToRemove) => {

   const removed = cartItems.map((cartItem) =>
       cartItem.id === productToRemove.id ? {...cartItem, quantity: cartItem.quantity - quantityToRemove} : cartItem
   )
    return removed.filter((cartItem) => cartItem.quantity > 0)
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: (productToAdd) => {},
    cartCount: 0,
    cartPrice: 0,
    removeFromCart: (productToRemove, amount) => {}
})


export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartCount, setCartCount] = useState(0)
    const [cartPrice, setCartPrice] = useState(0)

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount)
    }, [cartItems])

    useEffect(() => {
        const newCartPrice = cartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price),0)
        setCartPrice(newCartPrice)
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
        console.log(cartItems)
    }

    const removeFromCart = (productToRemove, amount = 1) => {
        setCartItems(removeCartItem(cartItems, productToRemove, amount))
    }

    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, removeFromCart, cartPrice}


    return (
        <CartContext.Provider value={value}> {children} </CartContext.Provider>
    )
}

