import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import {useNavigate} from "react-router-dom";
import {CartDropdownContainer, CartItems, EmptyMessage} from "./cart-dropdown.styles";

const CartDropdown = () => {
    const {cartItems} = useContext(CartContext)

    const navigate = useNavigate()

    const gotToCheckoutHandler = () => {
        navigate('/checkout')
    }

    return (
        <CartDropdownContainer>
            { cartItems.length ? (
                <CartItems cartItems={'cart-items'}>
                    {cartItems.map((item) => (
                        <CartItem key={item.id} cartItem={item}/>
                    ))}
                </CartItems>

            ) : (
                <EmptyMessage>Your cart is empty!</EmptyMessage>
            )}
            <Button onClick={gotToCheckoutHandler}>GO TO CHECKOUT</Button>

        </CartDropdownContainer>
    )
}

export default CartDropdown
