import './cart-dropdown.styles.scss'
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import {Link, useNavigate} from "react-router-dom";

const CartDropdown = () => {
    const {cartItems} = useContext(CartContext)

    const navigate = useNavigate()

    const gotToCheckoutHandler = () => {
        navigate('/checkout')
    }

    return (
        <div className={'cart-dropdown-container'}>
            <div cartItems={'cart-items'}>
                {cartItems.map((item) => (
                    <CartItem key={item.id} cartItem={item}/>
                ))}
            </div>
            <Button onClick={gotToCheckoutHandler}>GO TO CHECKOUT</Button>

        </div>
    )
}

export default CartDropdown
