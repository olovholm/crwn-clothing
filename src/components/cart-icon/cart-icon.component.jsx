import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import {CartIconContainer, ItemCount, ShoppingIcon} from "./cart-icon.styles";

const CartIcon = () => {



    const {updateCartVisibility, isCartOpen, cartCount} = useContext(CartContext)

    const toggleIsCartOpen = () => updateCartVisibility(!isCartOpen)

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon className={'shopping-icon'}/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )

}

export default CartIcon
