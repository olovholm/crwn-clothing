import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import './checkout-item.styles.scss'

const CheckoutItem = ({cartItem}) =>  {

    const {removeFromCart, addItemToCart} = useContext(CartContext)
    const { name, imageUrl, price, quantity } = cartItem

    const decrementItem = () => {
        removeFromCart(cartItem,1)
    }

    const incrementItem = () => {
        addItemToCart(cartItem)
    }

    const removeItem = () => {
        removeFromCart(cartItem, cartItem.quantity)
    }

    return (
        <div className={'checkout-item-container'}>
            <div className={'image-container'}>
                <img src={imageUrl} alt={name}/>
            </div>
            <span className={'name'}> {name}</span>
            <span className={'quantity'}>
                <div onClick={decrementItem} className={'arrow'}>&#10094;</div>
                <span className={'value'}>{quantity}</span>
                <div onClick={incrementItem} className={'arrow'}>&#10095;</div>
            </span>
            <span className={'price'}>{price}</span>
            <div onClick={removeItem} className={'remove-button'}>&#10005;</div>
        </div>

    )
}

export default CheckoutItem

